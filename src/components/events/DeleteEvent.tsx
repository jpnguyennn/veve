"use client";

import { Trash } from "lucide-react";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";

const deleteEvent = async (event_id: string) => {
	try {
		const response = await fetch("/api/event", {
			method: "DELETE",
			headers: { "Content-Type": "application / json" },
			body: JSON.stringify({ id: event_id }),
		});

		const result = await response.json();

		if (result.ok) {
			const date = new Date();
			toast("Event Successfully Deleted", {
				description: `Created at: ${date.toISOString}`,
			});
		} else {
			return NextResponse.json(
				{ error: "Could not successfully delete event..." },
				{ status: 409 }
			);
		}
	} catch (error) {
		console.error("Error:", error);
	}
};

export default function DeleteEvent({ event_id }: { event_id: string }) {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger className="p-3 text-gray-500 rounded-2xl hover:bg-red-200 hover:text-red-500 transition-all duration-450 ease-in-out flex cursor-grab">
					<Trash />
					<p className="font-noto ml-2">Delete</p>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete this event?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="cursor-grab">Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-300 cursor-grab"
							onClick={async () => {
								await deleteEvent(event_id);
							}}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
