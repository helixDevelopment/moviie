import { MovieResult } from "moviedb-promise";
import { PropsWithRef } from "react";

type MovieProps = PropsWithRef<{
	data: MovieResult
}>;

function MovieCard({ data }: MovieProps) {
	return (<div className="relative ease-in-outflex-shrink-0 w-[10rem] h-[15rem] bg-slate-200 m-2 rounded-md drop-shadow-md">
		<div className="w-full absolute">
			<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="w-full rounded-md"></img>
		</div>

		<div className="absolute w-full h-full p-2 text-white transition-all opacity-0 hover:opacity-100 bg-black/50 rounded-md">
			<p className="whitespace-nowrap text-ellipsis">{data?.title}</p>
		</div>
	</div>);
}

export default MovieCard;