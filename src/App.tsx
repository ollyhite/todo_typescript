import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  Suspense,
  lazy,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { customTheme } from "./theme/customTheme";
import { Dashboard } from "./pages/dashboard/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ComposeContext from "./context/Compose.context";
import { rootContext } from "./context/root.context";

const App: FC = (): ReactElement => {
  const ReactQueryDevtoolsProduction = lazy(() =>
    import("@tanstack/react-query-devtools/build/modern/production.js").then(
      (d) => ({
        default: d.ReactQueryDevtools,
      })
    )
  );
  //create a client
  // const queryClient = new QueryClient();
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // added the staleTime for queries globally
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Dashboard />
        </ThemeProvider>
      </ComposeContext>
      <ReactQueryDevtools initialIsOpen={false} />
      {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  );
};

export default App;
