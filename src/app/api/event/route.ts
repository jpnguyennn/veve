import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const retrieveEvents = async () => {
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
};

const createEvent = async (request: NextRequest) => {
	try {
		const session = await getServerSession();
		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body = await request.json();
		const {
			event_name,
			event_date,
			event_description,
			event_location_name,
			event_location_address,
		} = body;

		console.log(body);

		if (!event_name || !event_description || !event_date) {
			return NextResponse.json(
				{
					error: "Field(s) are missing from the form",
				},
				{ status: 400 }
			);
		}

		const user = await getCurrentUser();
		const event = await prisma.event.create({
			data: {
				event_name,
				date: event_date,
				description: event_description,
				hostId: user.id,
				location_name: event_location_name,
				location_address: event_location_address,
			},
			select: {
				id: true,
			},
		});

		return NextResponse.json(
			{ message: "Event created successfully", event },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating event:", error);

		// Handle Prisma validation errors
		if (error instanceof Error) {
			return NextResponse.json(
				{ error: "Event with this information already exists" },
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

const deleteEvent = async (request: NextRequest) => {
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

export { deleteEvent as DELETE, retrieveEvents as GET, createEvent as POST };
