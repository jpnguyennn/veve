"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addYears, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
	event_name: z.string(),
	event_date: z
		.date()
		.min(new Date(), { message: "Choose a date that is in the future!" }),
	event_description: z.string(),
	event_location_name: z.string(),
	event_location_address: z.string(),
});

export default function NewEvent() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			event_name: "",
			event_date: new Date(),
			event_description: "",
			event_location_name: "",
			event_location_address: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setMessage("");

		try {
			const response = await fetch("/api/event", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const result = await response.json();

			if (response.ok) {
				setMessage("Event created successfully");
				router.push("/dashboard/events");
			} else {
				setMessage(
					`Error: ${result.error || "Failed to create event"}`
				);
			}
		} catch (error) {
			setMessage("Network error. Please try again.");
			console.error("Error:", error);
		} finally {
			const date = new Date();

			toast(message, {
				description: `Created at: ${date.toISOString}`,
			});

			setIsLoading(false);
		}
	}

	// page 1 of the form
	const renderForm = () => {
		return (
			<div>
				<FormField
					control={form.control}
					name="event_name"
					render={({ field }) => (
						<FormItem className="mb-10">
							<FormLabel>Event Name</FormLabel>
							<FormControl>
								<Input placeholder="Event Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="event_date"
					render={({ field }) => (
						<FormItem className="mb-10">
							<FormLabel>Event Date</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date()
											}
											captionLayout="dropdown"
											startMonth={new Date()}
											endMonth={addYears(new Date(), 5)}
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="event_description"
					render={({ field }) => (
						<FormItem className="mb-10">
							<FormLabel>Event Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="What's your event about?"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="event_location_name"
					render={({ field }) => (
						<FormItem className="mb-10">
							<FormLabel>Location Name</FormLabel>
							<FormControl>
								<Input
									placeholder="What is the name of your location?"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="event_location_address"
					render={({ field }) => (
						<FormItem className="mb-10">
							<FormLabel>Location Address</FormLabel>
							<FormControl>
								<Textarea
									placeholder="What is the address of your location?"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
		);
	};

	return (
		<div className="m-10 font-noto">
			<div>
				<h1 className="text-5xl font-black">Create New Event</h1>
				<Separator className="my-10" />
			</div>
			<div className="m-20 mx-[25vw]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{renderForm()}

						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Creating..." : "Create Event"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
