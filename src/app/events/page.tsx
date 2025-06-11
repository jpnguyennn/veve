import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Events() {
	const events = await prisma.event.findMany();

	return (
		<div>
			<div
				className="min-h-[50vh] bg-hero flex justify-center items-center"
				id="hero"
			>
				<h1 className="font-noto font-black text-5xl text-white">
					Find Events
				</h1>
			</div>
			<div className="m-20">
				{events.map(async (event) => {
					const host = await prisma.user.findUnique({
						where: {id: event.hostId}
					})

					return (
						<div
							key={event.id}
							className="flex bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
						>
							<Image
								src="/images/eventPictureTemp.jpg"
								alt={event.event_name}
								width={300}
								height={150}
								className="rounded-2xl"
							/>
							<div className="flex-col ml-10">
								<h1 className="font-noto font-black text-[3rem]">{event.event_name}</h1>
								<p>{event.date.toDateString()}</p>
								<p>{event.description}</p>
								<p>Hosted By: {host?.name}</p>
							</div>
							<Button><Link href={`/events/${event.id}`}>Reserve</Link></Button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
