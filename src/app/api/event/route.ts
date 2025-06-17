import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user";

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
}

const updateEvents = async (request: NextRequest) => {
	try {
		const session = await getServerSession()
		if (!session) {
			return NextResponse.json({error: "Unauthorized"}, {status: 401})
		}

		const body = await request.json()
		const {event_name, event_date, event_description, location_name, location_address} = body

		if (!event_name || !event_description || !event_date) {
			return NextResponse.json({
				error: "Field(s) are missing from the form"
			}, {status: 400})
		}

		const user = await getCurrentUser();
		const event = await prisma.event.create({
			data: {
				event_name: event_name,
				date: event_date,
				description: event_description,
				hostId: user.id,
				location_name: location_name,
				location_address: location_address
			},
			select: {
				id: true,
			},
		});

		return NextResponse.json(
			{ message: 'Event created successfully', event },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Error creating event:', error);
   
    	// Handle Prisma validation errors
		if (error instanceof Error) {
			return NextResponse.json(
			{ error: 'Event with this information already exists' },
			{ status: 409 }
			);
		} else {
			return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
		}    
	}

}

export { retrieveEvents as GET, updateEvents as POST };

