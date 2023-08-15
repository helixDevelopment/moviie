import { useMemo, type PropsWithRef, Fragment } from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';

type NavbarProps = PropsWithRef<{
	selected: string;
}>;

function Navbar({ selected }: NavbarProps) {
	console.log(selected);

	const links = useMemo(() => {
		return <Fragment>
			<NavLink link="/" label="Library" />
			<NavLink link="/explore" label="Explore" />
			<NavLink link="/watchlist" label="Watchlist" />
		</Fragment>
	}, []);

	function NavLink(props: { link: string, label: string }): JSX.Element {
		return <Link href={props.link} className="px-2 hover:text-blue-600">
			{props.label}
		</Link>;
	}

	return (<nav className="fixed top-0 w-full py-4 bg-slate-200 z-50">
		<div className="relative mx-auto responsive-width py-0 w-full h-full flex flex-row items-center">
			<p className="absolute font-bold text-4xl hidden sm:block">Moviee</p>

			<div className="flex flew-row w-full md:w-fit md:mx-auto">
				<form className="flex flex-row max-w-[20rem] mx-auto">
					<input className="w-full lg:w-[20rem] p-3 py-1 my-1 rounded-full pl-8 border-2 border-black" type="text" placeholder="Search" />
					<button type="submit" className="absolute ml-1 mt-[0.9rem]">
						<Icon icon="ion:search-sharp" className="w-8" />
					</button>
				</form>

				<button className="block md:hidden">
					<Icon icon="ion:menu-sharp" className="w-8 h-8" />
				</button>
			</div>

			<div className="absolute hidden md:block right-0 bg mr-4 lg:mr-8">
				{links}
			</div>
		</div>
	</nav>)
}

export default Navbar;