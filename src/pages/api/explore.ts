import type { NextApiRequest, NextApiResponse } from "next";
import { MovieDb } from "moviedb-promise";
import { type ExploreData } from "~/lib/utils";

const moviedb = new MovieDb(process.env.TMDB_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse<ExploreData>) {
	try {
		const popular = await moviedb.moviePopular();
		const toprated = await moviedb.movieTopRated();
		const nowplaying = await moviedb.movieNowPlaying();

		const movies = {
			popular: popular.results ?? [],
			toprated: toprated.results ?? [],
			nowplaying: nowplaying.results ?? [],	
		};
		
		res.status(200).json(movies);
	} catch (error) {
		console.error(error);
		res.status(500);
	}
}