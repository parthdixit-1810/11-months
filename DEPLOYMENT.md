# Deployment Instructions

## Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a React app and deploy it

### Option 2: Netlify
1. Push this code to GitHub  
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: GitHub Pages
1. Push this code to GitHub
2. Go to Settings → Pages in your repository
3. Source: Deploy from a branch
4. Branch: gh-pages (or main) and / (root)
5. Add this to `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/' // Replace with your repo name
})
```

### Option 4: Manual Static Hosting
1. Run `npm run build`
2. Upload the `dist` folder to any static hosting service
3. Make sure the hosting serves the `index.html` file

## What's Included
- ✅ Pre-recorded apology audio (`apology.mp3`)
- ✅ Responsive design
- ✅ Beautiful animations
- ✅ Transcript functionality
- ✅ Production-ready build

## Audio File Location
The apology audio is located at `/public/apology.mp3` and will be available at `/apology.mp3` when deployed.
