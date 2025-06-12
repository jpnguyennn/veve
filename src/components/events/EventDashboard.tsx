import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

	return (
		<div>
			{loading && <div>Loading events...</div>}
			<div className="grid">
				{events?.map((event) => (
					<div key={event.id}>
						<div className="flex">
							<Image
								src="/images/eventPictureTemp.jpg"
								alt={event.event_name}
								width={300}
								height={275}
								className="rounded-2xl"
							/>
							<div className="flex-col ml-10 min-w-[75%]">
								<h1 className="text-4xl">{event.event_name}</h1>
								<p>
									Date:{" "}
									{new Date(event.date).toLocaleDateString()}
								</p>
							</div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant={"outline"}>
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>
											Event Settings
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Pencil /> Edit Event
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Trash /> Delete Event
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<Separator className="my-10" />
					</div>
				))}
			</div>
		</div>
	);
}
