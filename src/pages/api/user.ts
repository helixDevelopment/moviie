import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "~/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import type { UserSession } from "~/lib/types";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
    await new Promise((resolve) => setTimeout(resolve, 1));

    if (req.session.user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            ...req.session.user,
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