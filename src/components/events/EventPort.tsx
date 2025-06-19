import { Calendar, Clock, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Host {
	id: string;
	name: string | null;
	image: string | null;
}

export default function EventPort({
	event_id,
	event_image,
	event_title,
	event_date,
	event_host,
}: {
	event_id: string;
	event_image: string;
	event_title: string;
	event_date: Date;
	event_host: Host;
}) {
	const EVENT_DETAILS = [
		{ id: 1, icon: Calendar, text: event_date.toDateString() },
		{ id: 2, icon: Clock, text: event_date.toTimeString() },
		{ id: 3, icon: UserRound, text: event_host.name },
	];

	return (
		<div className="h-full flex flex-col rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl mb-10 border border-white/100">
			<Image
				src={event_image}
				alt={event_title}
				width={1000}
				height={1000}
				className="rounded-t-2xl min-w-[100%]"
			/>
			<div className="p-8 flex flex-col flex-grow">
				<h1 className="font-noto font-black text-3xl min-h-[3.5rem]">{event_title}</h1>
				{EVENT_DETAILS.map((detail) => {
					const Icon = detail.icon;

					return (
						<div key={detail.id} className="flex my-2">
							<Icon className="mr-5" />
							{detail.text}
						</div>
					);
				})}
				<Button className="mt-auto w-full text-xl">
					<Link href={`/events/${event_id}`}>Reserve</Link>
				</Button>
			</div>
		</div>
	);
}
