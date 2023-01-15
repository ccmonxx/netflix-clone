import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { theme } from "./Styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
