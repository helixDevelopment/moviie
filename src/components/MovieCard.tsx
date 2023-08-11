import { Icon } from "@iconify/react";
import { type MovieResult } from "moviedb-promise";
import { Fragment, useState, type PropsWithRef } from "react";


import { Dialog } from 'primereact/dialog';

type MovieProps = PropsWithRef<{
	data: MovieResult
}>;

function MovieCard({ data }: MovieProps) {
	const loaded = !!data?.title;

	const [isOpen, setIsOpen] = useState(false);

	const click = () => {
		setIsOpen(!isOpen);
	};

	/* if (isOpen) {
		return 
	} */

	if (!loaded) {
		return (<div className="flex flex-col p-2 animate-pulse ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-100 m-2 rounded-md">
			<div className="flex h-full">
				<Icon icon="bxs:movie" className="m-auto text-slate-200 w-10 h-10" />
			</div>
			<div className="w-full h-6 rounded-md bg-slate-200">
			</div>
		</div>);
	} else {
		return (
			<div className="relative ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-200 m-2 rounded-md drop-shadow-md border-[1px]" onClick={click}>
				<Dialog visible={isOpen} header={data?.title} onHide={click} className="w-[90%] sm:w-[80%] max-w-xl h-fit">
					<div className="flex flex-col w-full h-full bg-hsl(0, 0%, 100%)">
						<div className="flex flex-row w-full">
							<div className="w-full max-w-[10rem] p-2">
								<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
							</div>
							<div className="p-2 w-fit">
								<p>{data?.overview}</p>
							</div>
						</div>

					</div>
				</Dialog>
				<div className="w-full absolute">
					<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
				</div>

				<div className="absolute w-full h-full p-2 text-white transition-all opacity-0 hover:opacity-100 bg-black/70 rounded-md">
					<p className="text-center">{data?.title}</p>
				</div>
			</div>);
	}


}

export default MovieCard;