"use client";

import { useWindowWidth } from "@react-hook/window-size";
import {
	ChevronRight,
	FileText,
	Home,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Nav } from "./SessionNav";

type Props = object;

export default function SessionNavbar({}: Props) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const windowWidth = useWindowWidth();
	const isMobileWidth = windowWidth < 1500;

	function toggleSidebar() {
		setIsCollapsed(!isCollapsed);
	}

	return (
		<div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
			<Nav
				isCollapsed={isMobileWidth ? true : isCollapsed}
				links={[
					{
						title: "Dashboard",
						icon: Home,
						variant: "default",
						href: "/dashboard",
					},
					{
						title: "Events",
						icon: FileText,
						variant: "ghost",
						href: "/dashboard/events",
					},
				]}
			/>
			
			<button
				onClick={() => signOut({ callbackUrl: "/login" })}
				className="cursor-grab bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded justify-center items-center"
			>
				Sign Out
			</button>
         {!isMobileWidth && (
				<div className="absolute right-[-20px] bottom-7 cursor-grab">
               <div className="flex">
					<Link className="py-2" href={"/"}>
						<Image
							src="/images/vsaLogo.png"
							alt="VSA LOGO"
							width={160}
							height={120}
						/>
					</Link>
					<Button
						onClick={toggleSidebar}
						variant={"secondary"}
						className="rounded-full p-2"
					>
						<ChevronRight />
					</Button>
               </div>
				</div>
			)}
		</div>
	);
}
