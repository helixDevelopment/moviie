import { type User } from "@prisma/client";

export type ClientUser = Omit<User, "hashPw">;

export interface UserSession extends ClientUser {
	isLoggedIn: boolean;
}