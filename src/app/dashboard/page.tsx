"use client";

import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();

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
		// <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		// 	<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
		// 		<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
		// 		<p className="mb-4">
		// 			Welcome, {session.user?.name || session.user?.email}!
		// 		</p>
		// 	</div>
		// </div>
		<div className="m-10 font-noto font-black">
			<div>
				<h1 className="text-5xl">Welcome, {session.user?.name || session.user?.email}!</h1>
			</div>
			<Separator className="my-10"/>
		</div>
	);
}
