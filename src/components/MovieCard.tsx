import { Icon } from "@iconify/react";
import { type MovieResult } from "moviedb-promise";
import { useState, type PropsWithRef } from "react";


import * as Dialog from '@radix-ui/react-dialog';

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
		return (<div className="flex flex-col p-2 animate-pulse ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-100 m-2 rounded-md">
			<div className="flex h-full">
				<Icon icon="bxs:movie" className="m-auto text-slate-200 w-10 h-10" />
			</div>
			<div className="w-full h-6 rounded-md bg-slate-200">
			</div>
		</div>);
	}


	return (
		<Dialog.Root>
			<div className="relative ease-in-out flex-shrink-0 w-[6rem] h-[9rem] sm:w-[10rem] sm:h-[15rem] bg-slate-200 m-2 rounded-md drop-shadow-md border-[1px]" >
				<Dialog.Portal>
					<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title>
							{data?.title}
						</ Dialog.Title>

						<div className="flex flex-col w-full h-full bg-hsl(0, 0%, 100%)">
							<div className="flex flex-col sm:flex-row w-full">
								<div className="w-full max-w-[10rem] mx-auto sm:mx-0">
									<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
								</div>
								<div className="pt-4 sm:pt-0 pl-0 sm:pl-4 w-fit">
									<p>{data?.overview}</p>
								</div>
							</div>
						</div>
						<Dialog.Description />
						<Dialog.Close asChild>
							<button
								className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
								aria-label="Close"
							>
								<Icon icon={"mdi:close"} className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>


				<div className="w-full absolute" onClick={click}>
					<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
				</div>

				<Dialog.Trigger asChild>
					
				<div className="absolute w-full h-full p-2 text-white transition-all opacity-0 hover:opacity-100 bg-black/70 rounded-md" onClick={click}>
						<p className="text-center text-xs sm:text-base">{data?.title}</p>
					</div>
				</Dialog.Trigger>
			</div>
		</Dialog.Root>);
}

export default MovieCard;