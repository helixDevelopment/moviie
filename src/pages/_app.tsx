import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const queryClient: QueryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
    
    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
};

export default MyApp;
