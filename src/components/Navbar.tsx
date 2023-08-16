import { useMemo, type PropsWithRef, Fragment, useState } from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';

import clsx from "clsx";

type NavbarProps = PropsWithRef<{
	selected: string;
}>;

function Navbar({ selected }: NavbarProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

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

	function openSidebar() {
		console.log("open");
		setSidebarOpen(true);
	}

	function closeSidebar() {
		console.log("close");
		setSidebarOpen(false);
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

				<button className="block md:hidden" onClick={openSidebar}>
					<Icon icon="ion:menu-sharp" className="w-8 h-8" />
				</button>
			</div>

			<div className="absolute hidden md:block right-0 bg mr-4 lg:mr-8">
				{links}
			</div>
		</div>

{/* 		<div className="fixed z-[40] top-0 left-0 w-[100vw] h-[100vh] bg-red-300 opacity-20"></div>
 */}
		<aside className={clsx("fixed transition-all ease-in-out duration-200 z-50 p-4 top-0 right-0 w-full sm:w-[20rem] h-[100vh] bg-slate-300", {
			'translate-x-[20rem]': !sidebarOpen,
		})}>
			<button onClick={closeSidebar}>
			<Icon icon="ion:close-sharp" className="absolute top-0 right-0 w-8 h-8 m-4" />
			</button>
			<div className="flex flex-col gap-4 items-center mt-[20vh]">
			{links}

			</div>
		</aside>
	</nav>)
}

export default Navbar;