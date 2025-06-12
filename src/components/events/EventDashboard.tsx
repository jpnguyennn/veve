import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
						<h1>HEHIUHEIUHDIAHIU</h1>
						<h3>{event.event_name}</h3>
						<p>Date: {new Date(event.date).toLocaleDateString()}</p>
					</div>
				))}
			</div>
		</div>
	);
}
