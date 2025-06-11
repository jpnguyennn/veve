import { useEffect, useState } from "react";

export default function EventDashboard() {
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	// grab all events to this specific account
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch("/api/user");
				const data = await response.json();
				setEvents(data.events);
			} catch (error) {
				console.error("Failed to fetch events: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div>
			{loading && <div>Loading events...</div>}
			<div>
				{events?.map((event) => (
					<div key={event.id}>
						<h3>{event.event_name}</h3>
						<p>Date: {new Date(event.date).toLocaleDateString()}</p>
						{/* Add edit/delete buttons */}
					</div>
				))}
			</div>
		</div>
	);
}
