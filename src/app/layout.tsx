import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./providers/session-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
				className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} antialiased`}
			>
				<NextAuthProvider>
					<div className="flex flex-col">
						<ResponsiveLayout>
							<main className="flex-1">{children}</main>
						</ResponsiveLayout>
					</div>
				</NextAuthProvider>
			</body>
		</html>
	);
}
