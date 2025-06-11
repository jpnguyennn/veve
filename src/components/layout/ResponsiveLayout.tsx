"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import SessionSidebar from "./SessionNavbar";
import Navbar from "./Navbar";

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["500"],
	variable: "--font-inter",
});

export default function ResponsiveLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathName = usePathname();
	return pathName.includes("/dashboard") ? (
		<div
			className={`${cn(
				"h-screen w-full bg-white text-black flex overflow-hidden",
				inter.className
			)} ${inter.variable}`}
		>
			<SessionSidebar />
			{children}
		</div>
	) : (
		<>
			<Navbar />
			{children}
		</>
	);
}
