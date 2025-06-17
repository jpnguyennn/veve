import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { id } = body;

		if (!id) {
			return NextResponse.json(
				{
					error: "Event ID was not passed",
				},
				{ status: 400 }
			);
		}

		const event = await prisma.event.delete({ where: { id: id } });

		return NextResponse.json(
			{ message: "Event deleted successfully", event },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error deleting event:", error);

		// Handle Prisma validation errors
		if (error instanceof Error) {
			return NextResponse.json(
				{ error: "Event could not be found" },
				{ status: 409 }
			);
		} else {
			return NextResponse.json(
				{ error: "Internal server error" },
				{ status: 500 }
			);
		}
	}
};