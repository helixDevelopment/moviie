import { type PropsWithRef } from "react";
import Link from "next/link";

type NavbarProps = PropsWithRef<{
	selected: string;
}>;

export default function Navbar({ selected }: NavbarProps) {
	console.log(selected);

	function NavLink(props: { link: string, label: string}): JSX.Element {
		return <Link href={props.link} className="px-2 hover:text-blue-600">
			{props.label}
		</Link>;
	}
	
	return (<nav className="fixed top-0 mx-auto h-[4rem] px-8 sm:px-4 w-full sm:max-w-2xl ">
		<div className="relative bg-red-100 w-full h-full flex flex-row items-center">
			<p className="absolute">Moviee</p>
			<div className="mx-auto">
				<NavLink link="/" label="Library" />
				<NavLink link="/explore" label="Explore" />
				<NavLink link="/watchlist" label="Watchlist" />
			</div>
		</div>
	</nav>)
}