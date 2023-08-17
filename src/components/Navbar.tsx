import { useMemo, type PropsWithRef, Fragment, useState } from "react";
import Link from "next/link";
import { Icon } from '@iconify/react';

import clsx from "clsx";

import { useDebouncedCallback } from 'use-debounce';
import axios from "axios";
import { type MovieResult } from "moviedb-promise";
import SearchResult from "./SearchResult";
import ThemeSwitcher from "./ThemeSwitcher";
type NavbarProps = PropsWithRef<{
	selected: string;
}>;

function Navbar({ }: NavbarProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [searchResults, setSearchResults] = useState<MovieResult[]>([]);
	const [searching, setSearching] = useState(false);
	


	const debounced = useDebouncedCallback((value: string) => {
		if (value.length == 0) {
			setSearchResults([]);
			setSearching(false);
			return;
		}

		setSearching(true);
		const data = axios.post("/api/search", { query: value })
			.then(res => {
				setSearching(false);
				console.log("response", res);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				setSearchResults((res.data?.results || []) as MovieResult[]);
			}).catch(error => {
				setSearching(false);
				console.error(error);
			});
	}, 500);

	const links = useMemo(() => {
		return <Fragment>
			<NavLink link="/" label="Library" icon="ph:books" />
			<NavLink link="/explore" label="Explore" icon="material-symbols:explore-outline-rounded" />
			<NavLink link="/watchlist" label="Watchlist" icon="ion:eye-outline" />
		</Fragment>
	}, []);

	const search = useMemo(() => {
		console.log("search", searchResults);
		return <Fragment>
			{
				searchResults.map((result, i) => {
					return <SearchResult data={result} key={i} />
				})
			}
		</Fragment>
	}, [searchResults]);

	function NavLink(props: { link: string, label: string, icon: string }): JSX.Element {
		return <Link href={props.link} className="px-2 hover:text-blue-600 flex flex-row items-center">
			<Icon icon={props.icon} className="m-1 w-6 h-6" />
			<p>{props.label}</p>
		</Link>;
	}

	return (<nav className="fixed top-0 w-full py-4 bg-emerald-500 dark:bg-emerald-900 z-50">
		<div className="relative mx-auto responsive-width py-0 w-full h-full flex flex-row items-center">
			<p className="font-bold text-4xl hidden sm:block mx-2">Moviie</p>

			<form className="flex flex-row w-full xs:mx-2 justify-center">
				<div className="relative">
					<input className="w-full xs:w-[20rem] md:w-[24rem] p-3 pr-8 py-1 my-1 rounded-full pl-8 border-2 border-#696565" type="text" placeholder="Search" onChange={(e) => debounced(e.target.value)} />
					<div className="absolute w-full bg-slate-100 shadow-lg max-h-[20rem] overflow-y-scroll rounded-lg">
						{search}
					</div>
					<Icon icon="ion:search-sharp" className="absolute left-1 top-[14px] w-8 text-slate-400" />
					<Icon icon="mingcute:loading-3-line" className={clsx("absolute top-[10px] right-2 animate-spin w-6 h-6", {
						"hidden": !searching
					})} />
					<Icon icon="gg:close" onClick={() => debounced("")} className={clsx("absolute text-slate-400 top-[12px] right-2 w-5 h-5", {
						"hidden": searching
					})} />
				</div>

			</form>

			<ThemeSwitcher />

			<button className="right-0 pl-2 sm:pl-4" onClick={() => setSidebarOpen(true)}>
				<Icon icon="ion:menu-sharp" className="w-8 h-8" />
			</button>
		</div>

		{/* 		<div className="fixed z-[40] top-0 left-0 w-[100vw] h-[100vh] bg-red-300 opacity-20"></div>
 */}
		<aside className={clsx("fixed shadow-inner transition-all ease-in-out duration-200 z-50 p-4 top-0 right-0 w-full xs:w-[20rem] h-[100vh] bg-slate-300 dark:bg-slate-700", {
			'translate-x-[100vw]': !sidebarOpen,
		})}>
			<button onClick={() => setSidebarOpen(false)}>
				<Icon icon="ion:close-sharp" className="absolute top-0 right-0 w-8 h-8 m-4" />
			</button>

			<div className="mx-auto w-fit">
				<div className="flex flex-col gap-4 mt-[20vh]">
					{links}
				</div>
			</div>
		</aside>
	</nav>)
}

export default Navbar;