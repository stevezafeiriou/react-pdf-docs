import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
	FiChevronLeft,
	FiChevronRight,
	FiZoomOut,
	FiZoomIn,
	FiDownload,
} from "react-icons/fi";

/* PDF.js worker (ES‑module build) */
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BAR_H = 56;
const DESKTOP_BP = 1500;
const SIDEBAR_W = 240;
const MIN_SCALE = 0.5;
const MAX_SCALE = 0.8;

const Wrapper = styled.div`
	height: 100%;
	overflow-y: auto;
	background: ${({ theme }) => theme.colors.cardBg};
`;

const Bar = styled.div`
	position: fixed;
	top: 56;
	left: 0;
	height: ${BAR_H}px;
	width: 100%;
	background: ${({ theme }) => theme.colors.bg};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	z-index: 100;
	@media (min-width: ${DESKTOP_BP}px) {
		left: ${SIDEBAR_W}px;
		width: calc(100% - ${SIDEBAR_W}px);
	}
`;

const BarInner = styled.div`
	max-width: 960px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	gap: 0.6rem;
	padding: 0 0.5rem;
`;

const Title = styled.span`
	flex: 0 1 240px;
	min-width: 120px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-transform: capitalize;
	white-space: nowrap;
	font-size: 1rem;
	font-weight: 600;
`;

const Icon = styled.button`
	all: unset;
	flex-shrink: 0;
	padding: 0.25rem;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover:not(:disabled) {
		background: ${({ theme }) => theme.colors.cardBg};
	}
	&:disabled {
		opacity: 0.35;
		cursor: default;
	}
`;

const Zoom = styled(Icon)`
	@media (max-width: 767px) {
		display: none;
	}
`;

const Count = styled.span`
	flex-shrink: 0;
	font-size: 0.9rem;
`;

const Pages = styled.div`
	padding: ${BAR_H + 16}px 1rem 1rem;
	@media (min-width: ${DESKTOP_BP}px) {
		margin-left: ${SIDEBAR_W}px;
	}
`;

const PageWrap = styled.div`
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
`;

const Skeleton = styled.div`
	background: #e0e0e0;
	border-radius: 4px;
`;

const Footer = styled.div`
	padding: 1rem 0;
	text-align: center;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.text};
`;

export default function PdfViewer({ file }) {
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(MIN_SCALE);
	const [error, setError] = useState(null);
	const wrapRef = useRef(null);

	/* pretty title */
	const title = useMemo(() => {
		const raw = file?.split("/").pop() || "";
		return raw.replace(/\.pdf$/i, "").replace(/-/g, " ");
	}, [file]);

	/* scroll active page into view */
	useEffect(() => {
		const el = document.getElementById(`pdf-page-${pageNumber}`);
		el && el.scrollIntoView({ behavior: "smooth", block: "start" });
	}, [pageNumber]);

	return (
		<Wrapper ref={wrapRef}>
			{/* ---------- control bar ---------- */}
			<Bar>
				<BarInner>
					<Title title={title}>{title}</Title>

					<Icon
						onClick={() => setPageNumber((n) => Math.max(1, n - 1))}
						disabled={pageNumber <= 1}
						aria-label="Previous page"
					>
						<FiChevronLeft />
					</Icon>
					<Count>
						{pageNumber}/{numPages || "…"}
					</Count>
					<Icon
						onClick={() => setPageNumber((n) => Math.min(numPages, n + 1))}
						disabled={pageNumber >= numPages}
						aria-label="Next page"
					>
						<FiChevronRight />
					</Icon>

					<Zoom
						onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.25))}
						disabled={scale <= MIN_SCALE}
						aria-label="Zoom out"
					>
						<FiZoomOut />
					</Zoom>
					<Zoom
						onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.25))}
						disabled={scale >= MAX_SCALE}
						aria-label="Zoom in"
					>
						<FiZoomIn />
					</Zoom>

					<Icon as="a" href={file} download title="Download PDF">
						<FiDownload />
					</Icon>
				</BarInner>
			</Bar>

			{/* ---------- pages ---------- */}
			<Pages>
				{error ? (
					<p style={{ color: "red" }}>{error.message}</p>
				) : (
					<Document
						file={file}
						onLoadSuccess={({ numPages }) => {
							setNumPages(numPages);
							setPageNumber(1);
						}}
						onLoadError={setError}
						loading={null}
						noData={null}
					>
						{Array.from({ length: numPages }, (_, idx) => {
							const w = wrapRef.current?.clientWidth
								? wrapRef.current.clientWidth * scale
								: undefined;
							return (
								<PageWrap id={`pdf-page-${idx + 1}`} key={idx + 1}>
									<Page
										pageNumber={idx + 1}
										width={w}
										loading={
											<Skeleton
												style={{
													width: w || "80%",
													height: w ? w * 1.3 : 200,
												}}
											/>
										}
									/>
								</PageWrap>
							);
						})}
					</Document>
				)}
				<Footer>
					© {new Date().getFullYear()} Saphire. All Rights Reserved.
				</Footer>
			</Pages>
		</Wrapper>
	);
}
