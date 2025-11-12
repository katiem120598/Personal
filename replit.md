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

## Recent Changes (Nov 12, 2025)
- Imported from GitHub repository
- Configured for Replit environment
- Set up workflow for development server on port 5000
- Updated .gitignore to exclude node_modules and build artifacts
- Configured deployment settings for production
- Installed flowjockey dependencies
- Redesigned homepage with "plus lowkey also..." section featuring 5 cloud role tiles
- Fixed gradient styling (45deg top, 135deg bottom for mirror effect)
- **Created Portfolio 2.0** - new modular, data-driven portfolio system with:
  - JSON-based project data for easy editing (`assets/data/projects.json`)
  - Responsive CSS Grid layout with scrapbook aesthetic
  - Modal/dialog system for project details (mobile & desktop friendly)
  - Lazy loading images for better performance
  - Category headers for better organization
  - Accessible focus management for keyboard/screen reader users
- **Updated Portfolio 3.0** (Nov 12, 2025):
  - Removed tab navigation system for simpler, cleaner interface
  - Changed from 4 projects per page to 3 projects per page
  - Now displays all projects from all categories in a single continuous book
  - Updated CSS layout from 2x2 grid to vertical stack for better readability
  - Fixed all handleMenu onclick errors across 18 HTML files (ps70 pages, personal_favs, web_apps, etc.)
  - All pages now load without JavaScript errors

## Portfolio Sections

### Original Portfolio (proceduraldesign.html)
- **Procedural Design**: Computational design projects
- **Web Apps**: Interactive web applications
- **Personal Favorites**: Curated selection of favorite projects
- **Digital Fabrication**: Physical computing and fabrication work
- **Architecture**: Architectural design projects
- **Interactive Exhibits**: Installation and exhibit work
- **PS70**: Digital fabrication course documentation (weeks 1-10 + final)

### Portfolio 2.0 (portfolio2.html)
- **New modular portfolio system** designed for easy editing and maintenance
- **Data Structure**: Projects organized in `assets/data/projects.json` by category
  - Each project has: id, title, thumbnail, description, tags, and detailed info
  - Categories: creative_dev, engineering, interactive, architecture
- **Features**:
  - Responsive CSS Grid layout (mobile-first design)
  - Click to open detailed modal with full project info
  - Lazy-loaded images for performance
  - Scrapbook aesthetic with slight card rotations
  - Category headers for better organization
- **To Add Projects**: Simply edit `assets/data/projects.json` - no code changes needed!

### Portfolio 3.0 (portfolio3.html)
- **Interactive flippable scrapbook** with realistic page-turning animations (Issuu-style)
- **Technology**: Uses PageFlip.js library for realistic 3D page flipping effects
- **Data Source**: Same `assets/data/projects.json` as Portfolio 2.0 (all projects from all categories)
- **Features**:
  - Realistic page-turning animations with touch/swipe support
  - **3 projects per page** in vertical scrapbook layout
  - **Scrapbook decorations**: dashed borders, washi tape effects, sparkles, slight rotations
  - Click projects to view modal popup with details
  - Hardcover front and back for authentic book feel
  - Navigation buttons (prev/next) and page counter
  - Responsive design with fallbacks for mobile (switches to scrollable card layout)
  - **No tabs** - displays all projects from all categories in one continuous flipbook
- **Sample Data**: Populated with 6 projects per category (24 total projects)
- **To Add Projects**: Simply edit `assets/data/projects.json` - changes appear across all portfolio versions!

## Technology Stack
- HTML5
- CSS3 (with custom animations and gradients)
- JavaScript (vanilla JS for interactions)
- p5.js (for some visualizations)
- WebGL/Shaders (for advanced graphics)
- Python (development server)
- Font Awesome (icons)
- Google Fonts (Cherry Bomb One, Playfair Display, Work Sans)
