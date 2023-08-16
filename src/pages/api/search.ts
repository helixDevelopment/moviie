import type { NextApiRequest, NextApiResponse } from "next";
import { MovieDb, type MovieResult } from "moviedb-promise";

const moviedb = new MovieDb(process.env.TMDB_KEY!);

interface Data {
	results: MovieResult[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "POST") return res.status(405);

	try {
		const results = await moviedb.searchMovie({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			query: req.body.query as string,
		});

		res.status(200).json({
			results: (results.results ?? []).slice(0, 10).sort((a, b) => b.popularity! - a.popularity!)
		});
	} catch (error) {
		console.error(error);
		res.status(500);
	}
}