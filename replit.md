# Katie Mueller's Portfolio Website

## Overview
This is Katie Mueller's personal portfolio website showcasing projects in design, engineering, and creative technology. The site features a fun, playful aesthetic with animated elements and a comprehensive portfolio of work across multiple disciplines.

## Project Structure

### Main Portfolio Site (Root)
- **Entry Point**: `index.html`
- **Type**: Static HTML portfolio website
- **Tech Stack**: HTML, CSS, JavaScript
- **Assets**: Images, fonts, CSS files in `assets/` directory
- **Key Features**:
  - Responsive design with custom CSS animations
  - Portfolio pages for different project categories
  - PS70 (Introduction to Digital Fabrication) course documentation
  - Interactive elements with custom JavaScript

### Sub-Projects

#### Flowjockey (`flowjockey/`)
- Progressive Web App (PWA) built with:
  - Vite (build tool)
  - TypeScript
  - Lit (web components)
  - Workbox (service worker)
- Can be built separately with `npm run build` inside the flowjockey directory

#### Other Demos
- `music-visualizer-p5js/` - Audio visualization using p5.js
- `music-visualizer-shader/` - Shader-based music visualizer
- `gsd6483_workshop[5]_shaders/` - Shader workshop examples
- `ResponsiveEnv/` - Responsive environment project
- `voxel/` - Voxel-based project

## Development Setup

### Running Locally
The site runs on Python's built-in HTTP server on port 5000:
```bash
python3 -m http.server 5000 --bind 0.0.0.0
```

### Dependencies
- **Root level**: PostCSS with PurgeCSS for CSS optimization (optional)
- **Flowjockey**: Full npm dependencies listed in `flowjockey/package.json`

### Workflow Configuration
The Portfolio Website workflow is configured to serve the static site on port 5000 using Python's HTTP server. This is ideal for the static HTML structure of the main portfolio.

## Deployment
The site is configured for deployment using Replit's autoscale deployment target, which is perfect for this stateless static website. The deployment uses the same Python HTTP server configuration.

## Known Issues
- Some files reference `assets/js/combined.js` which is not in the repository (likely gitignored)
- Some video files (*.mp4) are excluded from the repository via .gitignore
- DrawingApp folder is gitignored and some pages may reference it

## Recent Changes (Nov 11, 2025)
- Imported from GitHub repository
- Configured for Replit environment
- Set up workflow for development server on port 5000
- Updated .gitignore to exclude node_modules and build artifacts
- Configured deployment settings for production
- Installed flowjockey dependencies

## Portfolio Sections
- **Procedural Design**: Computational design projects
- **Web Apps**: Interactive web applications
- **Personal Favorites**: Curated selection of favorite projects
- **Digital Fabrication**: Physical computing and fabrication work
- **Architecture**: Architectural design projects
- **Interactive Exhibits**: Installation and exhibit work
- **PS70**: Digital fabrication course documentation (weeks 1-10 + final)

## Technology Stack
- HTML5
- CSS3 (with custom animations and gradients)
- JavaScript (vanilla JS for interactions)
- p5.js (for some visualizations)
- WebGL/Shaders (for advanced graphics)
- Python (development server)
- Font Awesome (icons)
- Google Fonts (Cherry Bomb One, Playfair Display, Work Sans)
