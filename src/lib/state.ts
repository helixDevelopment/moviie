import { atom } from "jotai";
import type { UserSession} from "./types";

export const user = atom<UserSession | null>(null);

const state = {
	user,
}

export default state;