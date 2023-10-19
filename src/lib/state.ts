import { atom } from "jotai";
import { type ClientUser } from "~/pages/api/user";

export const loggedin = atom(false);
export const user = atom<ClientUser | null>(null);

const state = {
	loggedin,
	user,
}

export default state;