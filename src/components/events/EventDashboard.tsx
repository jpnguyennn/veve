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
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	// grab all events to this specific account
	useEffect(() => {
		async function fetchEvents() {
			try {
				const session = await fetch("/api/user");
				const user = await session.json();
				setEvents(user.events);
			} catch (error) {
				console.error("Failed to fetch events: ", error);
			} finally {
				setLoading(false);
			}
		}

		fetchEvents();
	}, []);

	return (
		<div>
			{loading && <div>Loading events...</div>}
			<div>
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
