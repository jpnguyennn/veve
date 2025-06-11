"use client";

import { useRouter } from "next/navigation";

export default function EventsBackButton() {
	const router = useRouter();

	return (
		<div className="flex">
			<button
				onClick={() => router.back()}
				className="mb-6 flex items-center space-x-2 text-black hover:text-black/50 transition-colors duration-300 text-2xl cursor-grab"
			>
				<span>←</span>
				<span>Back to Events</span>
			</button>
		</div>
	);
}
