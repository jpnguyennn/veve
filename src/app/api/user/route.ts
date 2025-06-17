import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await getCurrentUser();
		return NextResponse.json({ user });
	} catch (error) {
		console.error("User fetch error: ", error);
		
		if (error instanceof Error) {
			if (error.message === "Unauthorized") {
				return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
			}
			if (error.message === "User Not Found") {
				return NextResponse.json({ error: "User Not Found" }, { status: 404 });
			}
		}
		
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
