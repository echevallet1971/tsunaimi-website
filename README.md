# Tsunaimi Website

A modern, responsive website for Tsunaimi, built with Next.js 15 and TypeScript.

## Tech Stack

- **Framework**: Next.js 15.2.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Database**: PostgreSQL
- **Internationalization**: next-intl 4.0.2
- **Development Tools**:
  - ESLint
  - TypeScript
  - PostCSS
  - Autoprefixer

## Prerequisites

- Node.js 18 or later
- PostgreSQL database
- PM2 (for production deployment)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
POSTGRES_URL="postgres://..."

# Application
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tsunaimi-website.git
   cd tsunaimi-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:test` - Test database connection
- `npm run db:check` - Check form submissions

## Deployment

The website is deployed to a Synology NAS using PM2 for process management.

### Deployment Process

1. Create a release branch:
   ```bash
   ./scripts/create-branches.sh
   ```

2. Deploy to staging:
   ```bash
   ./scripts/deploy-staging.sh
   ```

3. Deploy to production:
   ```bash
   ./scripts/deploy-production.sh
   ```

### Post-Deployment Steps

After deployment, you need to:

1. SSH into the NAS:
   ```bash
   ssh -i ~/.ssh/tsunaimi_deploy_key tsnm_user@192.168.1.32
   ```

2. Navigate to the new version:
   ```bash
   cd /volume1/web/tsunaimi/production/tsunaimi-website-vX.X.X
   ```

3. Install dependencies and build:
   ```bash
   npm install
   npm run build
   npm prune --production
   ```

4. Start the application:
   ```bash
   pm2 start npm --name tsunaimi-prod -- start
   pm2 save
   ```

## Project Structure

```
tsunaimi-website/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions and database
│   └── styles/       # Global styles
├── public/           # Static assets
├── scripts/         # Deployment and utility scripts
└── types/           # TypeScript type definitions
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and confidential. 