import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { Toaster } from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const queryClient: QueryClient = new QueryClient();

import { Provider } from 'jotai'

const MyApp: AppType = ({ Component, pageProps }) => {

    return (
        <Provider>
            <QueryClientProvider client={queryClient}>
                <Toaster position="bottom-center" />
                <Component {...pageProps} />
            </QueryClientProvider>
        </Provider>
    )
};

export default MyApp;
