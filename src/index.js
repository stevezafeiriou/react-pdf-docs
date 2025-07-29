import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ThemeProviderWrapper from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProviderWrapper>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProviderWrapper>
	</React.StrictMode>
);
