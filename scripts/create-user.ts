import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const prisma = new PrismaClient();

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function createUserInteractively() {
  try {
    console.log('🔧 Interactive User Creation')
    console.log('===========================\n')

    const name = await askQuestion('Enter user name: ')
    const email = await askQuestion('Enter user email: ')
    const password = await askQuestion('Enter password: ')
    const role = await askQuestion('Enter role (user/admin) [default: user]: ') || 'user'

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format')
      return
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('❌ User already exists with this email')
      return
    }

    // Hash password
    console.log('\n🔐 Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    console.log('👤 Creating user...')
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'user' | 'admin',
      }
    })

    console.log('\n✅ User created successfully!')
    console.log('================================')
    console.log('ID:', newUser.id)
    console.log('Name:', newUser.name)
    console.log('Email:', newUser.email)
    console.log('Role:', newUser.role)
    console.log('Created:', newUser.createdAt.toISOString())

  } catch (error) {
    console.error('❌ Error creating user:', error)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createUserInteractively()