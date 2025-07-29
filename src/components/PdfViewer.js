// src/components/PdfViewer.js
import React, { useState, useRef, useEffect } from "react";
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

// Point to the ES‑module worker on UNPKG
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ViewerWrapper = styled.div`
	height: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
`;

const ControlsBar = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	background: #fff;
	padding: 1rem 2rem;
	border-bottom: 1px solid #e1e4e8;
	display: flex;
	align-items: center;
	gap: 1rem;

	@media (min-width: 1500px) {
		left: 240px;
		width: calc(100% - 240px);
	}
`;

const Title = styled.span`
	font-size: 1rem;
	font-weight: 600;
	color: #24292e;
`;

const Btn = styled.button`
	all: unset;
	margin: 0 0.25rem;
	padding: 0.25rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	border-radius: 4px;
	&:hover:not(:disabled) {
		background: #f0f3f5;
	}
	&:disabled {
		opacity: 0.3;
		cursor: default;
	}
`;

// hide zoom buttons on mobile
const ZoomBtn = styled(Btn)`
	@media (max-width: 767px) {
		display: none;
	}
`;

const DownloadLink = styled.a`
	all: unset;
	margin-left: auto;
	padding: 0.25rem;
	display: flex;
	align-items: center;
	font-size: 0.9rem;
	cursor: pointer;
	color: #24292e;
	border-radius: 4px;
	&:hover {
		background: #f0f3f5;
	}
`;

const Indicator = styled.span`
	font-size: 0.9rem;
	color: #333;
`;

const DocArea = styled.div`
	flex: 1;
	background: #f6f8fa;
	padding: 1rem;

	@media (min-width: 1500px) {
		margin-left: 240px;
	}
`;

const PageWrapper = styled.div`
	margin-bottom: 1rem;
	display: flex;
	justify-content: center;
`;

const Footer = styled.div`
	padding: 1rem 2rem;
	font-size: 0.8rem;
	color: #666;
	text-align: center;
`;

export default function PdfViewer({ file }) {
	const MIN_SCALE = 0.5;
	const MAX_SCALE = 0.8;

	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(MIN_SCALE);
	const [error, setError] = useState(null);

	// derive display name
	const rawName = file.split("/").pop() || "";
	const baseName = rawName.replace(/\.pdf$/, "").replace(/-/g, " ");
	const displayName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

	const containerRef = useRef();

	useEffect(() => {
		const el = document.getElementById(`pdf-page-${pageNumber}`);
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	}, [pageNumber]);

	return (
		<ViewerWrapper>
			<ControlsBar>
				<Title>{displayName}</Title>

				<Btn
					onClick={() => setPageNumber((n) => Math.max(n - 1, 1))}
					disabled={pageNumber <= 1}
				>
					<FiChevronLeft size={18} />
				</Btn>

				<Indicator>
					{pageNumber} / {numPages}
				</Indicator>

				<Btn
					onClick={() => setPageNumber((n) => Math.min(n + 1, numPages))}
					disabled={pageNumber >= numPages}
				>
					<FiChevronRight size={18} />
				</Btn>

				<ZoomBtn
					onClick={() => setScale((s) => Math.max(MIN_SCALE, s - 0.25))}
					disabled={scale <= MIN_SCALE}
				>
					<FiZoomOut size={18} />
				</ZoomBtn>

				<ZoomBtn
					onClick={() => setScale((s) => Math.min(MAX_SCALE, s + 0.25))}
					disabled={scale >= MAX_SCALE}
				>
					<FiZoomIn size={18} />
				</ZoomBtn>

				<DownloadLink href={file} download>
					<FiDownload size={18} style={{ marginRight: "0.25rem" }} />
				</DownloadLink>
			</ControlsBar>

			<DocArea ref={containerRef}>
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
						loading={<p>Loading PDF…</p>}
					>
						{Array.from({ length: numPages }, (_, i) => (
							<PageWrapper id={`pdf-page-${i + 1}`} key={i + 1}>
								<Page
									pageNumber={i + 1}
									width={containerRef.current?.clientWidth * scale}
								/>
							</PageWrapper>
						))}
					</Document>
				)}
				<Footer>
					© {new Date().getFullYear()} Saphire. All rights reserved.
				</Footer>
			</DocArea>
		</ViewerWrapper>
	);
}
