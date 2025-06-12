import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const events = await prisma.event.findMany();

		if (!events) {
			return NextResponse.json(
				{ error: "Events Unable to be Loaded" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ events });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
