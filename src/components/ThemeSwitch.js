import React from "react";
import styled from "styled-components";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useThemeMode } from "../theme";

const modes = ["system", "light", "dark"];

const Btn = styled.button`
	all: unset;
	cursor: pointer;
	padding: 0.35rem;
	border-radius: 6px;
	display: flex;
	align-items: center;
	&:hover {
		background: ${({ theme }) =>
			theme.name === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
	}
`;

export default function ThemeSwitch() {
	const { mode, setMode } = useThemeMode();
	const next = () => {
		const i = modes.indexOf(mode);
		setMode(modes[(i + 1) % modes.length]);
	};
	return (
		<Btn
			onClick={next}
			title={`Colour mode: ${mode}. Click to change.`}
			aria-label="Toggle theme"
		>
			{mode === "light" && <FiSun size={20} />}
			{mode === "dark" && <FiMoon size={20} />}
			{mode === "system" && <FiMonitor size={20} />}
		</Btn>
	);
}
