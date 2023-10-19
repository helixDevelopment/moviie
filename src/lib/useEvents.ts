import useSWR from "swr";
import type { ClientUser } from "../pages/api/user";
import type { Events } from "../pages/api/events";

export default function useEvents(user: ClientUser | undefined) {
    // We do a request to /api/events only if the user is logged in
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: events } = useSWR<Events>(
        user?.isLoggedIn ? `/api/events` : null,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { events };
}