"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
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
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { getUser } from "@/scripts/requests";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
	event_name: z.string(),
	event_date: z
		.date()
		.min(new Date(), { message: "Choose a date that is in the future!" }),
	event_description: z.string(),
});

export default function NewEvent() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			event_name: "",
			event_date: new Date(),
			event_description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const user = await getUser();

		const newEvent = await prisma.event.create({
			data: {
				event_name: values.event_name,
				date: values.event_date,
				description: values.event_description,
				hostId: user.id,
			},
			select: {
				id: true,
			},
		});

		console.log(newEvent);
	}

	return (
		<div className="m-10 font-noto font-black">
			<div>
				<h1 className="text-5xl">Create New Event</h1>
				<Separator className="my-10" />
			</div>
			<div className="m-20 mx-[30vw]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="event_name"
							render={({ field }) => (
								<FormItem className="mb-10">
									<FormLabel>Event Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Event Name"
											{...field}
										/>
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
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
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
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
