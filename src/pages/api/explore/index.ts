import type { NextApiRequest, NextApiResponse } from "next";
import { MovieDb, type MovieResult } from "moviedb-promise";

const moviedb = new MovieDb(process.env.TMDB_KEY!);

interface Data {
	data: MovieResult[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log("API: /api/explore");

	try {
		const data = await moviedb.moviePopular();
		const movies = data.results ?? [];
		

		res.status(200).json({ data: movies });
	} catch (error) {
		console.error(error);
		res.status(500);
	}
}