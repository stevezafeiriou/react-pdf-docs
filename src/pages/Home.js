import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { papers } from "../data";

const Container = styled.div`
	padding: 2rem;
	background: #ffffff;
	color: #24292e;
	height: auto;
	min-height: 100vh;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto 1rem;
	padding: 0;
	max-width: 1000px;
	width: 100%;

	@media (max-width: 767px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}
`;

const Title = styled.h1`
	margin: 0;
	font-size: 1.5rem;
`;

const Controls = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: center;
`;

const Showing = styled.div`
	color: #586069;
	font-size: 0.9rem;
`;

const SortSelect = styled.select`
	padding: 0.5rem 1rem;
	border: 1px solid #d2dad1ff;
	border-radius: 4px;
	background: #fff;
	font-size: 0.9rem;
`;

const SearchWrapper = styled.div`
	position: relative;
	flex: 1;
	max-width: 300px;
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 0.5rem 2.5rem 0.5rem 1rem;
	border: 1px solid #d1d5da;
	border-radius: 4px;
	font-size: 0.9rem;
`;

const SearchIcon = styled(FiSearch)`
	position: absolute;
	right: 0.75rem;
	top: 50%;
	transform: translateY(-50%);
	color: #888;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;

	@media (min-width: 768px) {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
	}
`;

const Card = styled.div`
	background: #f0f3f5;
	border-radius: 6px;
	padding: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	align-items: flex-start;

	/* same max‑width as Header and center */
	max-width: 1000px;
	width: 100%;
	margin: 0 auto;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const Thumbnail = styled.img`
	height: 96px;
	width: auto;
	object-fit: contain;
	border-radius: 4px;
	flex-shrink: 0;

	margin: 0 auto 0.75rem;

	@media (min-width: 768px) {
		margin: 0 0.75rem 0 0;
	}
`;

const Content = styled.div`
	flex: 1;
`;

const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media (min-width: 480px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

const CardTitle = styled.h2`
	font-size: 1.1rem;
	margin: 0;
`;

const CardDesc = styled.p`
	margin: 0.5rem 0;
	color: #555;
	font-size: 0.9rem;
	text-align: justify;
`;

const Meta = styled.div`
	font-size: 0.8rem;
	color: #777;
`;

const Badge = styled.span`
	display: inline-block;
	background: #27564622;
	color: #275646;
	border-radius: 12px;
	padding: 0.25rem 0.5rem;
	font-size: 0.75rem;
	margin-right: 0.5rem;
`;

const ViewBtn = styled.button`
	all: unset;
	background: transparent;
	color: #24292e;
	padding: 0.5rem 1rem;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: all 0.2s ease;
	&:hover {
		color: #ffffff;
		background-color: #24292e;
	}
`;

export default function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("recent");

	const filtered = useMemo(() => {
		let result = papers.filter(
			(p) =>
				p.title.toLowerCase().includes(search.toLowerCase()) ||
				p.description.toLowerCase().includes(search.toLowerCase())
		);
		if (sort === "recent") {
			result = result.sort((a, b) => new Date(b.date) - new Date(a.date));
		} else {
			result = result.sort((a, b) => a.title.localeCompare(b.title));
		}
		return result;
	}, [search, sort]);

	return (
		<Container>
			<Header>
				<Title>Document Archive</Title>
				<Controls>
					<Showing>Showing {filtered.length} papers</Showing>
					<SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value="recent">Most Recent</option>
						<option value="alpha">A → Z</option>
					</SortSelect>
					<SearchWrapper>
						<SearchInput
							placeholder="Search papers..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<SearchIcon />
					</SearchWrapper>
				</Controls>
			</Header>

			<List>
				{filtered.map((p) => (
					<Card key={p.file}>
						<Thumbnail src={p.thumbnail} alt={p.title} />
						<Content>
							<CardHeader>
								<CardTitle>{p.title}</CardTitle>
								<ViewBtn onClick={() => navigate(`/docs/${p.file}`)}>
									View &rarr;
								</ViewBtn>
							</CardHeader>
							<CardDesc>{p.description}</CardDesc>
							<Meta>
								<Badge>{p.category}</Badge>
								{p.date}
							</Meta>
						</Content>
					</Card>
				))}
			</List>
		</Container>
	);
}
