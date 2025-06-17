import EventsBackButton from "@/components/layout/BackButton";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { NextResponse } from "next/server";

interface PageProps {
	eventId: string;
}

export default async function EventPage({
	params,
}: {
	params: Promise<PageProps>;
}) {
	const { eventId } = await params;

	try {
		const event = await prisma.event.findUnique({ where: { id: eventId } });

		if (!event) {
			return NextResponse.json(
				{ error: "Event not found" },
				{ status: 401 }
			);
		}

		return (
			<div className="m-20">
				<EventsBackButton />
				<div className="flex">
					<Image
						src="/images/eventPictureTemp.jpg"
						alt={event.event_name}
						width={200}
						height={150}
						className="rounded-2xl"
					/>
					<div className="flex-col ml-10 min-w-[75%]">
						<h1 className="text-4xl">{event?.event_name}</h1>
					</div>
				</div>
            <Separator className="my-10"/>
			</div>
		);
	} catch (error) {
		console.log("Event Not Found: ", error);
	}
}
