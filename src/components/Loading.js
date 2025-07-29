import React from "react";
import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0%   { opacity: 0.35; }
  50%  { opacity: 0.7; }
  100% { opacity: 0.35; }
`;

const Shimmer = styled.div`
	background: #e0e0e0;
	border-radius: 4px;
	animation: ${pulse} 1.4s ease-in-out infinite;
`;

const GenericWrap = styled.div`
	padding: 2rem;
	max-width: 640px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Line = styled(Shimmer)`
	width: ${({ $w }) => $w};
	height: ${({ $h }) => $h || "14px"};
`;

const HomeWrap = styled.div`
	padding: 1.5rem;
	max-width: 1100px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Card = styled.div`
	display: flex;
	gap: 1rem;
	padding: 1rem;
	border-radius: 8px;
	background: ${({ theme }) => theme.colors.cardBg};
	${({ theme }) =>
		css`
			border: 1px solid ${theme.colors.border};
		`}
`;

const Thumb = styled(Shimmer)`
	width: 96px;
	height: 72px;
	flex-shrink: 0;
`;

const CardLines = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const PdfWrap = styled.div`
	padding: 56px 1rem 1rem;
`;

const PagePlaceholder = styled(Shimmer)`
	width: 80%;
	max-width: 700px;
	height: 450px;
	margin: 0 auto 1.5rem;
`;

const Loading = ({ isHome, isPdf }) => {
	if (isHome) {
		return (
			<HomeWrap>
				{Array.from({ length: 3 }).map((_, i) => (
					<Card key={i}>
						<Thumb />
						<CardLines>
							<Line $w="60%" $h="18px" />
							<Line $w="100%" />
							<Line $w="90%" />
							<Line $w="40%" />
						</CardLines>
					</Card>
				))}
			</HomeWrap>
		);
	}

	if (isPdf) {
		return (
			<PdfWrap>
				{Array.from({ length: 2 }).map((_, i) => (
					<PagePlaceholder key={i} />
				))}
			</PdfWrap>
		);
	}

	/* fallback generic */
	return (
		<GenericWrap>
			<Line $w="50%" $h="20px" />
			<Line $w="100%" />
			<Line $w="100%" />
			<Line $w="80%" />
			<Line $w="100%" $h="180px" />
		</GenericWrap>
	);
};

export default Loading;
