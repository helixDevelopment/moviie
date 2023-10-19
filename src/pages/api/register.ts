import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { hash } from "~/lib/hash";
import { sessionOptions } from "~/lib/session";

import { prisma } from "~/server/db";
import type { UserSession } from "~/lib/types";

interface RegisterParams {
	username: string;
	email: string;
	password: string;
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);

async function registerRoute(req: NextApiRequest, res: NextApiResponse<UserSession | { message: string }>) {
	const { username, email, password } = await req.body as RegisterParams;

	try {
		const userData = await prisma.user.create({
			data: {
				username,
				email,
				hashPw: hash(password),
			},
		});

		// Omits the password hash from the response
		req.session.user = {
			...userData,
			hashPw: null,
			isLoggedIn: true,
		} as UserSession;

		await req.session.save();

		res.json(req.session.user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error registering an account" });
	}
}
