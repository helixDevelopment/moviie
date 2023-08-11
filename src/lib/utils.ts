import { type MovieResult } from "moviedb-promise";
import { useMemo } from "react";
export const loadingMovies = Array(8).fill({ }) as MovieResult[];

export interface ExploreData {
	popular: MovieResult[];
	toprated: MovieResult[];
	nowplaying: MovieResult[];
}