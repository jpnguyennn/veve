import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
	const session = await getServerSession();

	if (!session?.user?.email) {
		throw new Error("Unauthorized");
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
			events: true,
		},
	});

	if (!user) {
		throw new Error("User Not Found");
	}

	return user;
}