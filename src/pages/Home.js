// src/pages/Home.js
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { papers } from "../data";

/* ---------- styled ---------- */
const Wrap = styled.div`
	max-width: 1100px;
	margin: 0 auto;
	padding: 1.5rem;
	background: ${({ theme }) => theme.colors.bg};
`;

const Head = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-bottom: 1.25rem;
`;

const InputWrap = styled.label`
	flex: 1;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.55rem 0.75rem;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 6px;
`;

const Input = styled.input`
	all: unset;
	flex: 1;
`;

const Select = styled.select`
	padding: 0.6rem 0.75rem;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 6px;
	background: ${({ theme }) => theme.colors.cardBg};
	color: ${({ theme }) => theme.colors.text};
`;

/* category pill bar */
const CatBar = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-bottom: 1.25rem;
`;

const Pill = styled.button`
	all: unset;
	cursor: pointer;
	padding: 0.35rem 0.8rem;
	border-radius: 9999px;
	font-size: 0.8rem;
	border: 1px solid ${({ theme }) => theme.colors.border};
	color: ${({ active, theme }) =>
		active ? theme.colors.bg : theme.colors.text};
	background: ${({ active, theme }) =>
		active ? theme.colors.text : theme.colors.border};
	transition: background 0.2s ease;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Card = styled.article`
	display: flex;
	gap: 1rem;
	padding: 1rem;
	background: ${({ theme }) => theme.colors.cardBg};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: 8px;
	@media (max-width: 767px) {
		flex-direction: column;
		text-align: justify;
	}
`;

const Thumb = styled.img`
	width: 96px;
	height: auto;
	object-fit: contain;
	flex-shrink: 0;
	border-radius: 4px;
`;

const CardMain = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const CardHead = styled.div`
	display: flex;
	align-items: baseline;
	gap: 0.5rem;
	flex-wrap: wrap;
`;

const Title = styled.h3`
	margin: 0;
	font-size: 1rem;
`;

const View = styled.button`
	all: unset;
	cursor: pointer;
	font-size: 0.9rem;
	color: ${({ theme }) => theme.colors.accent};
	transition: all 0.2s ease-in-out;
	&:hover {
		color: ${({ theme }) => theme.colors.text};
	}
`;

const Desc = styled.p`
	margin: 0.35rem 0 0.5rem;
	font-size: 0.9rem;
	color: ${({ theme }) => theme.colors.text};
`;

const Meta = styled.div`
	margin-top: auto;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.text};
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
`;

const Badge = styled.span`
	padding: 0.15rem 0.5rem;
	border-radius: 9999px;
	background: ${({ theme }) => theme.colors.accent}33;
`;

/* ---------- component ---------- */
export default function Home() {
	const navigate = useNavigate();

	/* search / sort / category state */
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("recent");
	const [cat, setCat] = useState("All");

	/* derive unique categories once */
	const categories = useMemo(
		() => ["All", ...new Set(papers.map((p) => p.category))],
		[]
	);

	/* filtered + sorted list */
	const filtered = useMemo(() => {
		let res = papers.filter(
			(p) =>
				(cat === "All" || p.category === cat) &&
				(p.title.toLowerCase().includes(search.toLowerCase()) ||
					p.description.toLowerCase().includes(search.toLowerCase()))
		);
		res =
			sort === "recent"
				? res.sort((a, b) => new Date(b.date) - new Date(a.date))
				: res.sort((a, b) => a.title.localeCompare(b.title));
		return res;
	}, [search, sort, cat]);

	return (
		<Wrap>
			{/* search + sort */}
			<Head>
				<InputWrap>
					<FiSearch />
					<Input
						placeholder="Search…"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</InputWrap>
				<Select value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value="recent">Recent</option>
					<option value="alpha">A-Z</option>
				</Select>
			</Head>

			{/* category pills */}
			{/* <CatBar>
				{categories.map((c) => (
					<Pill key={c} active={c === cat} onClick={() => setCat(c)}>
						{c}
					</Pill>
				))}
			</CatBar> */}

			{/* list of papers */}
			<List>
				{filtered.map((p) => (
					<Card key={p.file}>
						<Thumb src={p.thumbnail} alt={p.title} loading="lazy" />
						<CardMain>
							<CardHead>
								<Title>{p.title}</Title>
								<View onClick={() => navigate(`/docs/${p.file}`)}>View →</View>
							</CardHead>
							<Desc>{p.description}</Desc>
							<Meta>
								<Badge>{p.category}</Badge>
								{p.date}
							</Meta>
						</CardMain>
					</Card>
				))}
			</List>
		</Wrap>
	);
}
