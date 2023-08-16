import { type MovieResult } from "moviedb-promise";
import { type PropsWithRef } from "react";

type MovieProps = PropsWithRef<{
	data: MovieResult
}>;

function SearchResult({ data }: MovieProps) {
	
	return (
		<div className="w-full flex flex-row p-2 border-b-2" >
			<div className="w-[2rem]">
				<img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="rounded-sm"></img>
			</div>
			<p className="text-left">{data?.title}</p>
		</div>);
}

export default SearchResult;