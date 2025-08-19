import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { FiMenu, FiX, FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { IoCodeSlashSharp } from "react-icons/io5";
import { papers } from "../data";
import { useThemeMode } from "../theme";

const SIDEBAR_W = 240;
const MOBILE_H = 56;
const DESKTOP_BP = 1500;

const MobileBar = styled.div`
	position: fixed;
	inset: 0 0 auto 0;
	height: ${MOBILE_H}px;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: ${({ theme }) => theme.colors.bg};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	z-index: 120;
	@media (min-width: ${DESKTOP_BP}px) {
		display: none;
	}
`;

const IconBtn = styled.button`
	all: unset;
	cursor: pointer;
	padding: 0.5rem;
	border-radius: 6px;
	display: flex;

	&:hover {
		background: ${({ theme }) =>
			theme.name === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
	}
`;

const Overlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.45);
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
	transition: opacity 0.25s ease;
	z-index: 110;
	@media (min-width: ${DESKTOP_BP}px) {
		display: none;
	}
`;

const Drawer = styled.aside`
	position: fixed;
	inset: 0 auto 0 0;
	width: ${SIDEBAR_W}px;
	background: ${({ theme }) => theme.colors.bg};
	border-right: 1px solid ${({ theme }) => theme.colors.border};
	display: flex;
	flex-direction: column;
	transform: translateX(${({ open }) => (open ? 0 : "-100%")});
	transition: transform 0.25s ease;
	z-index: 120;
	@media (min-width: ${DESKTOP_BP}px) {
		transform: none;
	}
`;

const Content = styled.div`
	padding: 1.75rem 1rem 1rem;
	flex: 1 1 auto;
	overflow-y: auto;
`;

const Logo = styled.img`
	width: 64px;
	height: 64px;
	border-radius: 10px;
	margin-bottom: 1.5rem;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.03);
	}
`;

const PaletteRow = styled.div`
	display: flex;
	gap: 0.4rem;
	margin-bottom: 1.5rem;
`;
const PaletteBtn = styled.button`
	all: unset;
	cursor: pointer;
	padding: 0.35rem;
	border-radius: 6px;
	display: flex;
	${({ $active, theme }) =>
		$active &&
		css`
			background: ${theme.colors.accent}33;
		`}
	&:hover {
		background: ${({ theme }) =>
			theme.name === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
	}
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	.border-down {
		border-bottom: 1px solid ${({ theme }) => theme.colors.border};
		margin: 10px 0;
	}
`;

const NavItem = styled(NavLink)`
	padding: 0.55rem 1rem;
	border-radius: 6px;
	text-decoration: none;
	font-size: 0.95rem;
	color: ${({ theme }) => theme.colors.text};
	&.active,
	&:hover {
		background: ${({ theme }) => theme.colors.cardBg};
	}
`;

const Footer = styled.div`
	padding: 1rem;
	font-size: 0.8rem;
	color: ${({ theme }) => theme.colors.text};
	display: flex;
	align-items: center;
	a {
		color: ${({ theme }) => theme.colors.accent};
	}
`;

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	return (
		<>
			{/* mobile top bar (hamburger + cycling theme btn) */}
			<MobileBar>
				<IconBtn onClick={() => setOpen((o) => !o)}>
					{open ? <FiX size={24} /> : <FiMenu size={24} />}
				</IconBtn>
			</MobileBar>

			<Overlay visible={open} onClick={() => setOpen(false)} />

			{/* permanent / drawer sidebar */}
			<Drawer open={open}>
				<Content>
					<a href="https://saphirelabs.com">
						<Logo src="/favicon.jpg" alt="logo" loading="lazy" />
					</a>

					{/* small palette */}
					<ThemeButtons />

					<Nav>
						<NavItem to="/" onClick={() => setOpen(false)}>
							All Documents
						</NavItem>
						<div className="border-down" />
						{papers.map((p) => (
							<NavItem
								key={p.file}
								to={`/docs/${p.file}`}
								onClick={() => setOpen(false)}
							>
								{p.title}
							</NavItem>
						))}
					</Nav>
				</Content>

				<Footer>
					<IoCodeSlashSharp />
					&nbsp;Developed by&nbsp;
					<a
						href="https://github.com/stevezafeiriou/react-pdf-docs"
						target="_blank"
						rel="noreferrer"
					>
						Steve Zafeiriou
					</a>
				</Footer>
			</Drawer>
		</>
	);
}

function ThemeButtons() {
	const { mode, setMode } = useThemeMode();
	return (
		<PaletteRow>
			<PaletteBtn
				$active={mode === "light"}
				onClick={() => setMode("light")}
				title="Light theme"
			>
				<FiSun size={18} />
			</PaletteBtn>
			<PaletteBtn
				$active={mode === "dark"}
				onClick={() => setMode("dark")}
				title="Dark theme"
			>
				<FiMoon size={18} />
			</PaletteBtn>
			<PaletteBtn
				$active={mode === "system"}
				onClick={() => setMode("system")}
				title="Follow system theme"
			>
				<FiMonitor size={18} />
			</PaletteBtn>
		</PaletteRow>
	);
}
