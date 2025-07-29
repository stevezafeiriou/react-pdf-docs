import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const DocumentPage = lazy(() => import("./pages/DocumentPage"));

const Layout = styled.div`
	display: flex;
	height: 100vh;
	overflow: hidden;
`;

const Main = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const Content = styled.main`
	flex: 1;
	overflow-y: auto;
	@media (max-width: 1500px) {
		padding-top: 56px;
	}
`;

export default function App() {
	return (
		<Layout>
			<Sidebar />
			<Main>
				<Content>
					<Routes>
						{/* Home route with its own skeleton */}
						<Route
							path="/"
							element={
								<Suspense fallback={<Loading isHome />}>
									<Home />
								</Suspense>
							}
						/>

						{/* PDF route with its own skeleton */}
						<Route
							path="/docs/:file"
							element={
								<Suspense fallback={<Loading isPdf />}>
									<DocumentPage />
								</Suspense>
							}
						/>
					</Routes>
				</Content>
			</Main>
		</Layout>
	);
}
