import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const lightTheme = {
	name: "light",
	colors: {
		bg: "#ffffff",
		text: "#24292e",
		cardBg: "#f6f8fa",
		border: "#e1e4e8",
		accent: "#26A73B",
	},
};

const darkTheme = {
	name: "dark",
	colors: {
		bg: "#0d1117",
		text: "#c9d1d9",
		cardBg: "#161b22",
		border: "#30363d",
		accent: "#59f673ff",
	},
};

/* ---------- context ---------- */
const ThemeModeContext = createContext({ mode: "system", setMode: () => {} });
export const useThemeMode = () => useContext(ThemeModeContext);

/* ---------- helpers ---------- */
const systemPref = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

/* ---------- global style ---------- */
const GlobalStyle = createGlobalStyle`
  html,body,#root{margin:0;padding:0;height:100%;}
  body{
    background:${({ theme }) => theme.colors.bg};
    color:${({ theme }) => theme.colors.text};
    transition:background .25s ease,color .25s ease;
    font-family:-apple-system, BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",sans-serif;
  }
  a{color:${({ theme }) => theme.colors.accent};}
  ::selection{background:${({ theme }) => theme.colors.accent}33;}
  *{scrollbar-width:thin;scrollbar-color:${({ theme }) =>
		theme.colors.accent} ${({ theme }) => theme.colors.cardBg};}
`;

/* ---------- provider ---------- */
export default function ThemeProviderWrapper({ children }) {
	const [mode, setMode] = useState(
		() => localStorage.getItem("theme-mode") || "system"
	);

	/* active palette */
	const theme = useMemo(() => {
		const active = mode === "system" ? systemPref() : mode;
		return active === "dark" ? darkTheme : lightTheme;
	}, [mode]);

	/* persist & react to system‑pref changes */
	useEffect(() => {
		localStorage.setItem("theme-mode", mode);
		if (mode !== "system") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const cb = () => setMode("system");
		mq.addEventListener("change", cb);
		return () => mq.removeEventListener("change", cb);
	}, [mode]);

	/* mobile status‑bar colour */
	useEffect(() => {
		let meta = document.querySelector('meta[name="theme-color"]');
		if (!meta) {
			meta = document.createElement("meta");
			meta.setAttribute("name", "theme-color");
			document.head.appendChild(meta);
		}
		meta.setAttribute("content", theme.colors.bg);
	}, [theme]);

	return (
		<ThemeModeContext.Provider value={{ mode, setMode }}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</ThemeModeContext.Provider>
	);
}
