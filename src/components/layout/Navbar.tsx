"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavbarLinkItem from "./NavbarLinkItem";

const NAV_LIST = [
	{ text: "HOME", href: "/" },
	{ text: "FIND EVENTS", href: "/events" },
];

const Navbar = () => {
	const [navActive, setNavActive] = useState<boolean | null>(null);
	const [activeIdx, setActiveIdx] = useState<number | null>(-1);

	return (
		<header>
			<nav
				className="flex p-4 pt-1 pb-1 justify-between items-center bg-[rgb(255,255,255)] text-black border-b-8 border-red-950"
				id="nav"
			>
				<Link className="py-2" href={"/"}>
					<Image
						src="/images/vsaLogo.png"
						alt="VSA LOGO"
						width={200}
						height={120}
					/>
				</Link>
				<div
					onClick={() => setNavActive(!navActive)}
					className="nav__menu-bar"
				>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<div className={`${navActive ? "active" : ""} nav__menu-list`}>
					{NAV_LIST.map((menu, idx) => (
						<div
							onClick={() => {
								setActiveIdx(idx);
								setNavActive(false);
							}}
							key={menu.text}
							id="navbar_item"
						>
							<NavbarLinkItem
								active={activeIdx === idx}
								{...menu}
							/>
						</div>
					))}
					<div id="login_area">
						<a href="/login" target="_parent">
							<button className="cursor-grab ">
								LOGIN
							</button>
						</a>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
