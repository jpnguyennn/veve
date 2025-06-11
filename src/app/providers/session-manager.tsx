"use client";

import { useSessionTimeout } from "@/app/providers/useSessionTimeout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function SessionManager() {
	const { data: session } = useSession();
	const { resetTimeout } = useSessionTimeout(30); // 30 minutes

	useEffect(() => {
		if (!session) return;

		const events = [
			"mousedown",
			"mousemove",
			"keypress",
			"scroll",
			"touchstart",
		];

		const resetTimerOnActivity = () => {
			resetTimeout();
		};

		// Add event listeners for user activity
		events.forEach((event) => {
			document.addEventListener(event, resetTimerOnActivity, true);
		});

		return () => {
			events.forEach((event) => {
				document.removeEventListener(event, resetTimerOnActivity, true);
			});
		};
	}, [session, resetTimeout]);

	return null;
}
