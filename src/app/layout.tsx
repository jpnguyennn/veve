import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import type { Metadata } from "next";
import {  Noto_Sans } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	weight: ["300", "900"],
	subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
	title: "VEVE | Ticketing Made Easy",
	description: "VEVE is a ticketing website that allows you to host your events easily and for attendees to sign up.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${notoSans.variable} antialiased`}
			>
				<NextAuthProvider>
					<div className="flex flex-col">
						<ResponsiveLayout>
							<main className="flex-1">{children}</main>
							<Toaster />
						</ResponsiveLayout>
					</div>
				</NextAuthProvider>
			</body>
		</html>
	);
}
