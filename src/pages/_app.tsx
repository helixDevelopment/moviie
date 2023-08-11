import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const queryClient: QueryClient = new QueryClient();


import { PrimeReactProvider } from 'primereact/api';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
        

const MyApp: AppType = ({ Component, pageProps }) => {

    return (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <PrimeReactProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </PrimeReactProvider>
    )
};

export default MyApp;
