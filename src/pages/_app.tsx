import type { AppProps } from 'next/app';
import { useRef, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider, Hydrate, DehydratedState } from 'react-query';
import '../styles/globals.sass';
import '../styles/ck.css';
import { Session } from 'next-auth';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';


export default function App({Component, pageProps: { session, dehydratedState, ...pageProps }}: AppProps) {
  const queryClient = useRef(new QueryClient());

  const HydrateAtoms = ({ children }: {children: ReactNode}) => {
    useHydrateAtoms([[queryClientAtom, queryClient.current]]);
    return children as JSX.Element;
  };
  

  return (
    <SessionProvider session={session as Session}>
      <QueryClientProvider client={queryClient.current}>
        <Provider>
          <Hydrate state={dehydratedState as DehydratedState} >
            <HydrateAtoms>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </HydrateAtoms>
          </Hydrate>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}