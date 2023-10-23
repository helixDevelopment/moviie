import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import type { UserSession } from "~/lib/types";
import { fetcher } from "./utils";
import { useAtom } from "jotai";
import state from "./state";

export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
    const [user, setUser] = useAtom(state.user);

    const { data: userData } = useSWR<UserSession>("/api/user", fetcher);

    useEffect(() => {
        console.log("user updated", userData);

        setUser({
            ...userData,
            hashPw: null,
        } as UserSession);
    }, [userData, setUser]);

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !userData) return;

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !userData?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && userData?.isLoggedIn)
        ) {
            void Router.push(redirectTo);
        }
    }, [userData, redirectIfFound, redirectTo]);

    const refresh = async () => {
        const userData = await fetcher("/api/user") as UserSession;

        setUser({
            ...userData,
            hashPw: null,
        } as UserSession);
    }

    return { refresh };
}