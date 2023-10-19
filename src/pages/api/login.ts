import type { UserSession } from "~/lib/types";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { hash } from "~/lib/hash";

interface LoginParams {
    email: string;
    password: string;
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = await req.body as LoginParams;

    console.log(req);

    try {
        const userData = await prisma.user.findUnique({
            where: { email: email, hashPw: hash(password) },
        });
        
        if (!userData) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

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
        res.status(500).json({ message: "Error logging in" });
    }
}