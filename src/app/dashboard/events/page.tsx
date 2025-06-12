"use client";

import EventDashboard from "@/components/events/EventDashboard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();

	//checks to see if the user is logged in
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (!session) {
		return null;
	}

	return (
		<div className="m-10 font-noto font-black">
			<div>
				<h1 className="text-5xl">Events</h1>
			</div>
			<Separator className="my-10" />
			<div className="flex">
				<Button>
					<a href="/dashboard/events/new" className="flex">
						<PlusCircle className="mr-2"/>
						<p className="">Create New Event</p>
					</a>
				</Button>
				
			</div>
			<Separator className="my-10" />
			<EventDashboard />
		</div>
	);
}
