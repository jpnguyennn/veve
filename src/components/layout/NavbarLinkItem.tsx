import Link from "next/link";

const NavbarLinkItem = ({
	text,
	href,
}: {
	text: string;
	href: string;
}) => {
	return (
		<Link href={href}>
			<h3 id="navbar_text">{text}</h3>{" "}
		</Link>
	);
};

export default NavbarLinkItem;
