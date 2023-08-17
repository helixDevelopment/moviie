import { Icon } from "@iconify/react";
import { type MovieResult } from "moviedb-promise";
import { useState, type PropsWithRef } from "react";


import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';

type MovieProps = PropsWithRef<{
	data: MovieResult
}>;

function MovieCard({ data }: MovieProps) {
	const loaded = !!data?.title;

	const [seen, setSeen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const click = () => {
		setIsOpen(!isOpen);
	};

	/* if (isOpen) {
		return 
	} */

	if (!loaded) {
		return (<div className="flex flex-col p-2 animate-pulse ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-100 dark:bg-slate-800 m-2 rounded-md">
			<div className="flex h-full">
				<Icon icon="bxs:movie" className="m-auto text-slate-200 dark:text-slate-600 w-10 h-10" />
			</div>
			<div className="w-full h-6 rounded-md bg-slate-200 dark:bg-slate-600">
			</div>
		</div>);
	}


	return (
		<div className="relative ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-200 m-2 rounded-md drop-shadow-md border-[1px]" >
			<Dialog visible={isOpen} headerClassName="bg-red-500" header={data?.title} onHide={click} className="w-[90%] sm:w-[80%] max-w-xl h-fit">
				<div className="flex flex-col w-full h-full bg-hsl(0, 0%, 100%)">
					<div className="flex flex-col sm:flex-row w-full">
						<div className="w-full max-w-[10rem] mx-auto sm:mx-0">
							<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
						</div>
						<div className="pt-4 sm:pt-0 pl-0 sm:pl-4 w-fit">
							<p>{data?.overview}</p>
						</div>
					</div>
					<div className="mt-4 flex flex-row">
						<div className="flex items-center">
							<p>Seen</p>
							<Checkbox className="m-2" onChange={e => setSeen(e.checked!)} checked={seen} />
						</div>

						<button className="border-2 rounded-md p-2 px-4 mx-2">{"Rate"}</button>
						<button className="border-2 rounded-md p-2 px-4">{"Seen"}</button>
					</div>
				</div>
			</Dialog>

			<div className="w-full absolute" onClick={click}>
				<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
			</div>

			<div className="absolute w-full h-full p-2 text-white transition-all opacity-0 hover:opacity-100 bg-black/70 rounded-md" onClick={click}>
				<p className="text-center text-xs sm:text-base">{data?.title}</p>
			</div>
		</div>);
}

export default MovieCard;