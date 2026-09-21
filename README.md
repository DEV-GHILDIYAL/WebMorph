# WebMorph ⚡

> **High-Performance, Privacy-First Bulk Image Conversion Studio**  
> Convert images to ultra-efficient WebP format entirely within your browser with zero server uploads, zero data leakage, and industrial memory stability.

---

## 🌟 Overview

**WebMorph** is a modern, client-side web utility designed to solve the common issues of image compression and conversion: slow server upload times, file privacy risks, and browser tab crashes during bulk processing. 

All conversions run **100% locally** using native browser APIs (`createImageBitmap`, `OffscreenCanvas`, and `canvas.toBlob()`), allowing dozens of high-resolution images to be converted in seconds without ever touching an external server.

---

## 🚀 Key Features

- **⚡ Zero-Server Local Processing**: Files never leave your device. Complete privacy and zero latency.
- **🛡️ Industrial Memory Management**:
  - Uses `createImageBitmap` for off-main-thread image decoding without Base64 memory bloating.
  - Automatically invokes memory de-allocation (`bitmap.close()` and canvas buffer resets) to prevent browser tab crashes during large batch jobs.
  - Sequential processing queue ensures consistent UI responsiveness.
- **📦 Smart Batch Archiving (JSZip)**:
  - Download converted images individually or export everything in a single `.zip` file.
  - Automatic duplicate filename resolution to prevent file collisions inside archives.
- **🎨 Luxury Studio & Custom Themes**:
  - **12 Curated Presets**: Modern Professional, Earthy Minimal, Eco-Forest, Vibrant Tech, Sunset, High Contrast, and more.
  - **Architect Mode**: Full real-time design customizer for primary accents, page backgrounds, typography colors (H1–H6, paragraphs), and gradient styling.
  - **Ambient Backgrounds**: Choose from curated high-res ambient backgrounds or upload your own, with customizable blur and opacity sliders persisted via **IndexedDB**.
- **📊 Real-time Conversion Queue**:
  - Drag-and-drop zone with instant visual feedback.
  - Individual progress indicators, live memory health pulse monitor, and clear/cancel options.

---

## 📁 Supported Formats

| Format | Extension | Output |
| :--- | :--- | :--- |
| **PNG** | `.png` | `.webp` |
| **JPEG / JPG** | `.jpg`, `.jpeg` | `.webp` |
| **GIF** (static capture) | `.gif` | `.webp` |
| **Bitmap** | `.bmp` | `.webp` |
| **SVG** | `.svg` | `.webp` |
| **WebP** (re-compression) | `.webp` | `.webp` |

> *Note: Output quality is optimized at high-fidelity 95% quality preserving original dimensions.*

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 4](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Compression & Archiving**: [JSZip](https://stuk.github.io/jszip/)
- **Local Persistence**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via [`idb`](https://github.com/jakearchibald/idb)

---

## 📂 Project Structure

```text
WebMorph/
├── public/
│   ├── backgrounds/        # Preset studio wallpapers and ambient assets
│   └── favicon.png         # WebMorph brand icon
├── src/
│   ├── components/
│   │   ├── AboutProject.jsx      # Architecture & engine documentation view
│   │   ├── BackgroundManager.jsx # Ambient background renderer & persistence
│   │   ├── BatchActions.jsx      # Bottom conversion and ZIP control bar
│   │   ├── CustomSettings.jsx    # Studio theme & wallpaper architect
│   │   ├── DeveloperProfile.jsx  # Developer portfolio & contacts
│   │   ├── FileCard.jsx          # Individual queued item with progress & download
│   │   ├── Header.jsx            # Top navigation bar & system pulse monitor
│   │   ├── ThemeArchitect.jsx    # Dynamic CSS variable injector for custom themes
│   │   ├── UploadZone.jsx        # Drag-and-drop file upload target
│   │   └── ui/                   # Reusable UI primitives (Button, Badge, etc.)
│   ├── hooks/
│   │   └── useFileQueue.js       # Asynchronous queue & batch execution hook
│   ├── lib/
│   │   ├── converter.js          # Core canvas & createImageBitmap conversion logic
│   │   └── db.js                 # IndexedDB client for background and settings
│   ├── App.jsx                   # Main layout and view router
│   ├── index.css                 # Base theme styles and Tailwind layers
│   └── main.jsx                  # React application entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DEV-GHILDIYAL/WebMorph.git
   cd WebMorph
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Production Build

To generate the optimized production distribution:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🔒 Privacy & Local-First Philosophy

WebMorph operates under a strict **Local-First principle**:
- **No telemetry**: Your usage data and image contents are never tracked.
- **No cloud storage**: No file handles or converted blobs are sent over the network.
- **Automatic Garbage Collection**: Converted blobs and object URLs are revoked as soon as files are removed or cleared.

---

## 👨‍💻 Developer & Credits

Crafted with ❤️ by **[Dev Ghildiyal](https://github.com/DEV-GHILDIYAL)**.

- **GitHub**: [@DEV-GHILDIYAL](https://github.com/DEV-GHILDIYAL)
- **LinkedIn**: [Dev Ghildiyal](https://www.linkedin.com/in/dev-ghildiyal/)
- **Contact**: `ghildiyaldev1325@gmail.com`

---

## 📄 License

This project is open source and available under the **MIT License**.