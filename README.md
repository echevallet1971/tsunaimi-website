# TsunAImi Website

This is the official website for TsunAImi, built with Next.js 14 and TypeScript.

## Project Structure

### Layout Hierarchy

The website uses a nested layout structure to handle internationalization and common UI elements:

```
src/app/
├── layout.tsx              # Root layout (HTML, body, footer)
└── [locale]/              # Locale-specific routes
    ├── layout.tsx         # Locale layout (Navigation, main content)
    └── page.tsx           # Home page
```

#### Layout Components

1. **Root Layout** (`src/app/layout.tsx`)
   - Provides the base HTML structure
   - Includes global styles and fonts
   - Contains the footer component
   - Handles metadata and SEO

2. **Locale Layout** (`src/app/[locale]/layout.tsx`)
   - Manages internationalization with next-intl
   - Provides the navigation component
   - Wraps page content in a main container
   - Handles locale-specific routing

### Key Components

- `Navigation`: Client-side navigation component with language switching
- `ContactForm`: Client-side form component for user inquiries
- `LanguageSwitcher`: Handles language switching between EN/FR

### Internationalization

The website supports multiple languages using the `[locale]` dynamic route:
- English (`/en`)
- French (`/fr`)

Translations are stored in `src/messages/{locale}.json`.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and configure environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
npm start
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

Proprietary - All rights reserved 