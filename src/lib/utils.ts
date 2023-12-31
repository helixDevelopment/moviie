import { type MovieResult } from "moviedb-promise";
export const loadingMovies = Array(8).fill({ }) as MovieResult[];

export interface ExploreData {
	popular: MovieResult[];
	toprated: MovieResult[];
	nowplaying: MovieResult[];
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());