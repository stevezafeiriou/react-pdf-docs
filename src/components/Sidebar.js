import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";
import { papers } from "../data";

export default function Sidebar() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<MobileBar>
				<MenuButton onClick={() => setOpen((o) => !o)}>
					{open ? <FiX size={24} /> : <FiMenu size={24} />}
				</MenuButton>
			</MobileBar>

			<Overlay visible={open} onClick={() => setOpen(false)} />

			<Drawer open={open}>
				<Top>
					<a href="https://saphirelabs.com">
						<Logo src="/favicon.jpg" alt="Logo" />
					</a>
					<Nav>
						<NavLink to="/" onClick={() => setOpen(false)}>
							Documents
						</NavLink>
						{papers.map((p) => (
							<NavLink
								key={p.file}
								to={`/docs/${p.file}`}
								onClick={() => setOpen(false)}
							>
								{p.title}
							</NavLink>
						))}
					</Nav>
				</Top>
				<Footer>
					Developed by{" "}
					<a href="https://saphirelabs.com" target="_blank" rel="noreferrer">
						Saphire Labs
					</a>
				</Footer>
			</Drawer>
		</>
	);
}

const MOBILE_BAR_HEIGHT = 56;

const MobileBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: ${MOBILE_BAR_HEIGHT}px;
	background: #fff;
	border-bottom: 1px solid #e1e4e8;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	z-index: 1000;

	@media (min-width: 1500px) {
		display: none;
	}
`;

const MenuButton = styled.button`
	all: unset;
	cursor: pointer;
`;

const MobileLogo = styled.img`
	width: 32px;
	height: 32px;
	margin-left: auto;
`;

const Overlay = styled.div`
	display: ${({ visible }) => (visible ? "block" : "none")};
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 900;

	@media (min-width: 1500px) {
		display: none;
	}
`;

const Drawer = styled.aside`
	position: fixed;
	top: ${MOBILE_BAR_HEIGHT}px;
	left: ${({ open }) => (open ? "0" : "-240px")};
	width: 240px;
	height: calc(100vh - ${MOBILE_BAR_HEIGHT}px);
	background: #fff;
	border-right: 1px solid #e1e4e8;
	display: flex;
	flex-direction: column;
	transition: left 0.25s ease;
	z-index: 950;

	@media (min-width: 1500px) {
		top: 0;
		left: 0;
		height: 100vh;
	}
`;

const Top = styled.div`
	padding: 1rem;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	/* hide scrollbar */
	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`;

const Logo = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 8px;
	margin-bottom: 1rem;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.03);
	}
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	font-size: 0.85rem;

	a {
		padding: 0.75rem 1rem;
		margin-bottom: 0.25rem;
		color: #24292e;
		font-weight: 500;
		text-decoration: none;
		border-radius: 6px;
		transition: background 0.2s;

		&.active {
			background: #f0f3f5;
			color: #275646;
		}
		&:hover {
			background: #f0f3f5;
		}
	}
`;

const Footer = styled.footer`
	padding: 1rem;
	font-size: 0.75rem;
	color: #586069;
	border-top: 1px solid #e1e4e8;

	a {
		color: #275646;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`;
