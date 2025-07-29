import React from "react";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";

export default function DocumentPage() {
	const { file } = useParams();
	return <PdfViewer file={`/${file}`} />;
}
