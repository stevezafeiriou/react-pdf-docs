import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DocumentPage from "./pages/DocumentPage";

const Layout = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden; /* prevent any nested scrollbars here */
`;

const Main = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const Content = styled.main`
	flex: 1;
	overflow-y: auto;
	@media screen and (max-width: 1500px) {
		padding-top: 56px; /* push below mobile bar */
	}
`;

export default function App() {
	return (
		<Layout>
			<Sidebar />
			<Main>
				<Content>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/docs/:file" element={<DocumentPage />} />
					</Routes>
				</Content>
			</Main>
		</Layout>
	);
}
