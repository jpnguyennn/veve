import { NextResponse } from "next/server";

export async function getUser() {
	try {
		const response = await fetch("/api/user");
		return await response.json();
	} catch (error) {
		console.error("Failed to fetch events: ", error);
	}

	return null;
}

export async function getEvents() {
	try {
		const response = await fetch("api/event");
		return await response.json()
	} catch (error) {
		console.error("Events fetch: ", error);
				return NextResponse.json(
					{ error: "Internal Server Error" },
					{ status: 500 }
				);
	}
}