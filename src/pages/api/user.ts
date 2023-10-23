import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "~/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import type { UserSession } from "~/lib/types";
import { prisma } from "~/server/db";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
    console.log("userRoute", req.session);

    if (req.session.user) {
        const user = await prisma.user.findUnique({
            where: { email: req.session.user.email },
        });
        
        res.json({
            ...req.session.user,
            hashPw: null,
            isLoggedIn: true,
        } as UserSession);
    } else {
        res.json({
            isLoggedIn: false,
            login: "",
            avatarUrl: "",
        } as unknown as UserSession);
    }
}