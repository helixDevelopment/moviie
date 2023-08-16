import { type MovieResult } from "moviedb-promise";
import { type PropsWithRef } from "react";
import Image from "next/image";

type MovieProps = PropsWithRef<{
	data: MovieResult
}>;

function SearchResult({ data }: MovieProps) {

	return (
		<div className="w-full flex flex-row p-2 border-b-2 items-center" >
			<div className="w-[2rem]">
				<Image src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data.title!} width={100} height={100} className="rounded-sm" />
			</div>

			<p className="px-2 py  -1 mb-auto">{data?.title}</p>
			<p className="text-sm p-1 bg-slate-200 w-fit h-fit rounded-md ml-auto">{(data?.release_date ?? "").split("-").at(0)}</p>
		</div>);
}

export default SearchResult;