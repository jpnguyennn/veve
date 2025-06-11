import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div
				className="min-h-[50vh] bg-hero flex flex-col justify-center items-center"
				id="hero"
			>
				<h1 className="font-noto font-black text-5xl text-white mb-[15px]">A New Way to Host</h1>
				<p className="font-noto font-light text-xl text-white">For all of your event registration needs</p>
			</div>
			<div id="about"></div>
			<div id="events"></div>
		</div>
	);
}
