# React PDF Viewer & Library

A responsive **multi‑document PDF reader** built with React 18, React‑PDF, Styled‑Components, and React Router (v6).
Now with light/dark/system themes, lazy‑loaded skeletons, category pills for instant filtering, and an in‑app comments panel.

## Key Features

| Area                | Details                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Documents**       | • Display any PDF placed in `/public/`<br>• Pages load lazily & render at the width of the viewport                           |
| **Home Library**    | • Search bar<br>• Sort (A–Z / Recent)<br>• **Category pills** for 1‑click filters                                             |
| **Viewer Controls** | • Sticky top bar: Prev / Next, page indicator, zoom (> 767 px), Download<br>• Filename truncates gracefully                   |
| **Comments Panel**  | • 320 px panel on the right (≥ 1024 px)<br>• Mobile drawer toggled by 💬 icon<br>• Client‑side state; swap in your API easily |
| **Theming**         | • Light / Dark / System toggle (sidebar palette)<br>• Global `<ThemeProvider>` + `GlobalStyle`                                |
| **Loading UX**      | • Route‑level skeletons (`<Loading isHome \| isPdf />`)<br>• Per‑page grey placeholders while React‑PDF renders canvases      |
| **Performance**     | • `React.lazy` + `Suspense` code‑splitting<br>• Native `loading="lazy"` for all thumbnails<br>• Worker‑powered PDF rendering  |
| **Responsive**      | • 240 px sidebar on desktop; hamburger on mobile<br>• Controls bar auto‑offsets for sidebar & comments panel                  |

## Project Structure

```text
react-pdf-viewer/
├── public/
│   ├── manifesto.pdf
│   ├── another-doc.pdf
│   └── favicon.jpg
├── src/
│   ├── components/
│   │   ├── Loading.js          # route‑level skeletons
│   │   ├── PdfViewer.js        # viewer + comments panel
│   │   ├── Sidebar.js
│   │   └── ThemeSwitch.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── DocumentPage.js
│   ├── theme.js                # ThemeProvider + GlobalStyle
│   ├── data.js                 # list of PDFs
│   ├── App.js
│   └── index.js
└── README.md
```

## Installation

```bash
git clone https://github.com/your‑username/react-pdf-viewer.git
cd react-pdf-viewer
npm install
npm start
```

Visit [http://localhost:3000](http://localhost:3000).

## Adding Documents

1. **Copy** your PDFs into `public/` (e.g. `public/design‑system.pdf`).

2. **Reference** them in `src/data.js`:

   ```js
   export const papers = [
   	{
   		file: "design-system.pdf", // <- relative to /public
   		title: "Design System",
   		description: "Guidelines & assets.",
   		category: "Docs",
   		date: "Aug 2025",
   		thumbnail: "/thumb-design.jpg",
   	},
   	// ...
   ];
   ```

3. Sidebar & Home update automatically—no extra routing required.

## Themes

| Control                  | Location                                      | Persistence             |
| ------------------------ | --------------------------------------------- | ----------------------- |
| Palette buttons (☀ 🌙 🖥) | Sidebar header                                | Saved in `localStorage` |
| System mode              | Follows `prefers‑color‑scheme` & live‑updates |                         |

## Comments Panel

- **Desktop (≥1024 px)** – Fixed on the right; pages get `margin‑right: 320px`.
- **Mobile / Tablet** – Hidden by default; toggle with the 💬 icon in the top bar.
- All comments live in local component state—swap in fetch/Socket logic as needed.

## Responsive Breakpoints

| Width           | Sidebar      | Comments      | Zoom buttons |
| --------------- | ------------ | ------------- | ------------ |
|  < 768 px       | Hamburger    | Drawer via 💬 | Hidden       |
|  768 – 1023 px  | Hamburger    | Drawer via 💬 | Visible      |
|  1024 – 1499 px | Hamburger    | Fixed 320 px  | Visible      |
|  ≥ 1500 px      | Fixed 240 px | Fixed 320 px  | Visible      |

## Contributing

```text
git checkout -b feature/my‑feature
# code …
git commit -m "Add amazing feature"
git push origin feature/my‑feature
# open PR
```

## License

MIT — see [`LICENSE`](LICENSE).
