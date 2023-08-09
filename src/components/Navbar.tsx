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
	
	return (<nav className="fixed top-0 mx-auto responsive-width mt-2 sm:mt-0 px-8">
		<div className="relative responsive-width py-0 bg-red-100/20 w-full h-full flex flex-row items-center">
			<p className="absolute font-bold text-4xl hidden sm:block">Moviee</p>
			<div className="mx-auto">
				<NavLink link="/" label="Library" />
				<NavLink link="/explore" label="Explore" />
				<NavLink link="/watchlist" label="Watchlist" />
			</div>
		</div>
	</nav>)
}