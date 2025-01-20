# Ship Your Car Safely - Development Context

## Project Overview
Repository: https://github.com/baileylatimer/ship-your-car-safely.git
Branch Strategy: Main branch for production deployments

This is a Remix-based website integrated with Sanity CMS, deployed on Netlify, and styled with Tailwind CSS. The project serves as a car shipping service website with dynamic content management capabilities.

## Tech Stack Integration

### 1. Remix Framework & TypeScript
- Using Remix version 2.13.1
- Handles routing and server-side rendering
- Main entry point: `app/root.tsx`
- Routes are located in `app/routes/`
- Components are in `app/components/`
- API integration through `app/routes/api.sanity.tsx`
- TypeScript for type safety and better developer experience
- Types defined for all component props
- Sanity schema types in `app/types/sanity.ts`:
  - `SanityImage`: Common image type
  - `Hero`: Hero section data
  - `Statistics`: Statistics section data with stats array
  - `VideoSection`: Video section with title, video URL, and cover image
  - `LoaderData`: Root loader data structure

### 2. Sanity CMS Integration
- Project ID: 'uxddufsz'
- Dataset: 'production'
- Located in `sanity-studio/` directory
- Schemas defined:
  - Hero (`hero.ts`): Title and background image
  - Statistics (`statistics.ts`): Heading, description, and stats array
  - Video Section (`video-section.ts`): Title, video file, and cover image
- Client configuration in `app/lib/sanity.image.ts`
- API endpoint in `app/routes/api.sanity.tsx` fetches all content
- Image URL builder utility for handling Sanity image assets

### 3. Netlify Deployment
- Configuration in `netlify.toml`
- Build command: `npm run build`
- Publish directory: `build/client`
- Using Netlify adapter for Remix
- Environment variables:
  - SANITY_PROJECT_ID
  - SANITY_DATASET

### 4. Tailwind CSS Integration
- Configuration in `tailwind.config.js`
- Styles in `app/styles/tailwind.css`
- Using PostCSS with Tailwind plugins
- Custom components styled using Tailwind utility classes

## Component Structure

### Hero Section
- Located in `app/components/hero.tsx`
- Displays main hero image with overlay text
- Data managed through Sanity CMS

### Statistics Section
- Located in `app/components/statistics-section.tsx`
- Shows key statistics in a grid layout
- Data structure:
  - Heading
  - Description
  - Stats array (4 items)

### Video Section
- Located in `app/components/video-section.tsx`
- Features:
  - Custom video player
  - Gradient overlay (184px height)
  - Play/pause functionality
  - Custom thumbnail support
  - Accessible controls

## Data Flow
1. Sanity Studio → Content Creation
2. Remix API Route (`api.sanity.tsx`) → Data Fetching
3. Index Route (`_index.tsx`) → Data Distribution
4. React Components → Content Display

## Development Workflow
1. Local Development:
   ```bash
   npm run dev        # Starts Remix development server
   cd sanity-studio
   npm run dev       # Starts Sanity Studio
   ```

2. Content Updates:
   - Access Sanity Studio at http://localhost:3333
   - Create/edit content
   - Changes reflect in the app

3. Deployment:
   - Push to main branch
   - Netlify automatically builds and deploys
   - Environment variables set in Netlify dashboard

## Key Files
- `app/root.tsx`: Main app configuration
- `app/routes/_index.tsx`: Homepage route
- `app/routes/api.sanity.tsx`: Sanity API integration
- `sanity-studio/schemas/`: Content schemas
- `netlify.toml`: Deployment configuration
- `tailwind.config.js`: Styling configuration

## Environment Variables
```env
SANITY_PROJECT_ID=uxddufsz
SANITY_DATASET=production
```

## Current Features
1. Hero section with dynamic content
2. Statistics display with customizable metrics
3. Video section with:
   - Custom player controls
   - Gradient overlay
   - Thumbnail support
   - Accessibility features

## Development Practices
- Feature branches for new components/sections
- Commit messages follow conventional commits
- Testing in development before pushing to main
- Content updates through Sanity Studio
- Environment variables managed in Netlify

## Future Considerations
- Add more content types as needed
- Enhance SEO capabilities
- Implement additional interactive features
- Optimize image and video delivery
- Add TypeScript types for all Sanity schemas
