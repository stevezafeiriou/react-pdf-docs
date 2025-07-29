# React PDF Viewer

A simple, responsive, one‑page PDF reader built with React, React‑PDF, Styled‑Components and React Router. Display multiple PDFs from your `public/` folder, with a sidebar for navigation and sticky top controls for page navigation, zooming and downloading.

## Features

- **Multiple documents** via React Router (sidebar links to each PDF)
- **Single‑page reader** showing one PDF at a time
- **Sticky top controls** (always visible on desktop & mobile):
  - Document title
  - Previous / Next page
  - Page indicator
  - Zoom Out / Zoom In (hidden on small screens)
  - Download button
- **Responsive layout**:
  - **Desktop**: 240px sidebar + sticky controls spanning remaining width
  - **Mobile (<768px)**: sidebar collapses to a hamburger, controls bar sticks below 56px header, zoom buttons hidden
- **Styled‑Components** for scoped CSS
- **Global styles** in `GlobalStyle.js`—no separate theme file

## Project Structure

```

my-pdf-viewer/
├── public/
│ ├── manifesto.pdf
│ ├── another-doc.pdf
│ └── favicon.jpg
├── src/
│ ├── components/
│ │ ├── PdfViewer.js
│ │ ├── Sidebar.js
│ │ └── TopBar.js
│ ├── pages/
│ │ ├── Home.js
│ │ └── DocumentPage.js
│ ├── data.js
│ ├── App.js
│ ├── index.js
│ └── GlobalStyle.js
├── LICENSE
├── package.json
└── README.md

```

## Installation

```bash
git clone https://github.com/your‑username/my‑pdf‑viewer.git
cd my‑pdf‑viewer
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

1. **Add** your PDFs to `public/` (e.g. `public/manifesto.pdf`).

2. **List** them in `src/data.js`:

   ```js
   // src/data.js
   export const papers = [
   	{
   		file: "/manifesto.pdf",
   		title: "Saphire Labs Manifesto",
   		description: "Our guiding principles and research philosophy.",
   		category: "Docs",
   		date: "July 29, 2025",
   		thumbnail: "/thumb-manifesto.jpg",
   	},
   	// …more
   ];
   ```

3. **Sidebar** automatically picks up `papers` and builds links.

4. **Routes** in `App.js` mount `Home` at `/` and `PdfViewer` at `/docs/:file`.

5. **Global styles** in `GlobalStyle.js` already set your font, colors and reset.

## Styling & Colors

All your palette is in `GlobalStyle.js` (no extra theme file). For example:

```js
// src/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #f6f8fa;
    color: #24292e;
  }

  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; background: none; border: none; }
`;
```

## Responsive Behavior

- **Desktop** (≥1500px)

  - 240px fixed sidebar
  - Controls bar: `position: sticky; top:0; left:240px; width:calc(100%-240px)`

- **Mobile** (<768px)

  - Sidebar hidden behind a hamburger icon
  - Controls bar: `position: sticky; top:56px; left:0; width:100%`
  - Zoom buttons hidden (`@media (max-width: 767px) { display: none }`)

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -am 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE)
