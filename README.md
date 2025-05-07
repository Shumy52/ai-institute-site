
# AI Institute Website

A modern, responsive website for the Artificial Intelligence Research Institute (AIRI) at the Technical University of Cluj-Napoca, built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design with mobile-friendly navigation
- Interactive research unit explorer
- Interactive timeline with animation effects
- News and media galleries
- Interactive map of collaborating universities
- Contact form integration

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion for animations
- React Leaflet for interactive maps
- React Vertical Timeline for the timeline component
- Next Share for social media integration

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server with Turbopack:
    ```bash
    npm run dev
    ```
4. Open http://localhost:3000 in your browser

### Production Build:
```bash
npm run build
npm start
```

### Static Export:
To generate a static site that can be deployed to any web server:
```bash
npm run export
```

### Docker Deployment
Yes, this project also includes docker:
```bash
# Make sure you're in the root of the project. The dot at the end of the command assumes that
docker build -t airi-website . 

# Run the container
docker run -p 3000:3000 airi-website
```

## Project Structure
- src\app - Page components for each route
- src\components - Reusable UI components
- public\ - Static assets