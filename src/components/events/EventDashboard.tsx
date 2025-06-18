"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteEvent from "./DeleteEvent";

interface Event {
	id: string;
	event_name: string;
	date: string;
	description: string;
	image: string;
	// Add other properties as needed based on your API response
}

export default function EventDashboard() {
	const { data: session, status } = useSession();
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	const router = usePathname();

	// grab all events to this specific account
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/user");

				if (!response.ok) {
					throw new Error("Failed to fetch user data");
				}

				const data = await response.json();
				setEvents(data.user.events);
			} catch (error) {
				console.error("Failed to fetch events: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, [session, status]);

	const deleteEvent = async (event_id: string) => {
		setLoading(true);

		try {
			const response = await fetch("/api/event/delete", {
				method: "POST",
				headers: { "Content-Type": "application / json" },
				body: JSON.stringify({ id: event_id }),
			});

			const result = await response.json();

			if (result.ok) {
				setLoading(false);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoading(false);

			const date = new Date();
			toast("message", {
				description: `Created at: ${date.toISOString}`,
			});
		}
	};

	return (
		<div>
			{loading && <div>Loading events...</div>}
			<div className="grid">
				{events?.map((event) => {
					const eventRoute = router + "/" + event.id;

					return (
						<div key={event.id}>
							<div className="flex">
								<Image
									src="/images/eventPictureTemp.jpg"
									alt={event.event_name}
									width={300}
									height={275}
									className="rounded-2xl"
								/>
								<div className="flex-col ml-10">
									<h1 className="text-4xl">
										{event.event_name}
									</h1>
									<p>
										Date:
										{new Date(
											event.date
										).toLocaleDateString()}
									</p>
								</div>
								<div className="flex items-center-safe ml-auto mr-0 font-light">
									<a href={eventRoute} className="flex p-3 mr-5 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all duration-450 ease-in-out">
										<Pencil />
										<p className="font-noto ml-2">
											Edit
										</p>
									</a>
									<DeleteEvent event_id={event.id} />
								</div>
							</div>
							<Separator className="my-10" />
						</div>
					);
				})}
			</div>
		</div>
	);
}
