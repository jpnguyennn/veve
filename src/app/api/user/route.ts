import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession();

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
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
			return NextResponse.json(
				{ error: "User Not Found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ user });
	} catch (error) {
		console.error("User fetch error: ", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
