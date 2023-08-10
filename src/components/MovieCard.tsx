import { PropsWithRef } from "react";

type MovieProps = PropsWithRef<{
	name: string,
	image: string
}>;

function MovieCard({ name, image }: MovieProps) {
	return (<div className="flex-shrink-0 w-[10rem] h-[15rem] bg-slate-200 p-2 m-2 rounded-md drop-shadow-md">

	</div>);
}

export default MovieCard;