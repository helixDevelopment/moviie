import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import type { UserSession } from "~/lib/types";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
    req.session.destroy();
    res.json({ isLoggedIn: false, id: "", username: "", email: "" });
}