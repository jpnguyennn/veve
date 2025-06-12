import EventsBackButton from "@/components/layout/BackButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import Image from "next/image";

interface PageProps {
	eventId: string;
}

export default async function EventPage({
	params,
}: {
	params: Promise<PageProps>;
}) {
	const { eventId } = await params;

	const event = await prisma.event.findUnique({ where: { id: eventId } });

	return (
		<div className="m-20">
			<EventsBackButton />
			<Image
				src="/images/eventPictureTemp.jpg"
				alt="Event Banner"
				height="0"
				width="0"
				sizes="100vw"
				className="rounded-2xl w-[100%] max-h-[600px] object-cover"
			/>
			<div className="flex">
				<div className="w-full">
					<h1 className="font-noto font-black text-[5rem]">
						{event?.event_name}
					</h1>
					<h2 className="font-noto font-light text-[2rem] text-gray-400">
						{event?.date.toDateString()}
					</h2>
					<Separator className="my-10" />
					<h2 className="font-noto font-black text-[2.5rem]">
						Description:
					</h2>
					<p>{event?.description}</p>
				</div>
				<div className="my-10">
					<div className="w-[25vw] flex-col bg-orange-200/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
						<h1 className="text-[1.5vw] text-center font-noto mb-10">
							Reserve Your Seating!
						</h1>
						<Button className="w-full">Reserve</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
