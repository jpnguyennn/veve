import EventPort from "@/components/events/EventPort";
import prisma from "@/lib/prisma";

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
			{events.length == 0 && (
				<div className="items-center justify-center text-center">
					<h1 className="text-5xl font-noto font-black">
						No events available! Check back later!
					</h1>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-20">
				{events.map(async (event) => {
					const host = await prisma.user.findUnique({
						where: { id: event.hostId },
						select: {
							id: true,
							name: true,
							image: true,
						},
					});

					return (
						<div key={event.id}>
							<EventPort
								event_id={event.id}
								event_image="/images/eventPictureTemp.jpg"
								event_title={event.event_name}
								event_date={event.date}
								event_host={
									host || {
										id: "0",
										name: "unknown",
										image: "/images/eventPictureTemp.jpg",
									}
								}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
