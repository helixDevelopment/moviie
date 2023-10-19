import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export const hash = (content: string) => {
	const salt = genSaltSync(10);
	const hashed = hashSync(content, salt);

	return hashed;
}

export const compare = (content: string, hashed: string) => {
	return compareSync(content, hashed);
}