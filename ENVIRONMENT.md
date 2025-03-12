# Environment Configuration Guide

This document outlines how to set up and manage environment configurations for the TsunAImi website.

## Environment Files

We use different environment files for different deployment stages:

- `.env.local` - Local development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment
- `.env.example` - Template file (committed to git)

## Setup Process

1. Copy `.env.example` to create your environment-specific file:
   ```bash
   # For local development
   cp .env.example .env.local
   ```

2. Update the values in your environment file according to your needs:
   - Database credentials
   - Email configuration
   - Other environment-specific settings

3. Never commit actual environment files (`.env.*`) to git. Only `.env.example` should be committed.

## Environment Variables

### Database Configuration
- `DB_USER` - Database username
- `DB_HOST` - Database host
- `DB_NAME` - Database name
- `DB_PORT` - Database port (default: 5432)
- `DB_SSL` - Whether to use SSL (true/false)
- `POSTGRES_PASSWORD` - Database password

### Email Configuration
- `EMAIL_SERVICE` - Email service to use (console/smtp/sendgrid)
- `EMAIL_USER` - Email service username
- `EMAIL_FROM` - From address for emails
- `EMAIL_TO` - Default recipient address

### Node Environment
- `NODE_ENV` - Environment name (development/staging/production)

## Environment-Specific Settings

### Local Development (.env.local)
- Uses local database
- Console-based email service
- Development-specific features enabled

### Staging (.env.staging)
- Uses staging database
- Real email service with test accounts
- Staging-specific logging and monitoring

### Production (.env.production)
- Uses production database
- Real email service with production accounts
- Enhanced security settings
- Production-level logging and monitoring

## Security Notes

1. Never store sensitive credentials in code or git
2. Use appropriate security measures for each environment
3. Regularly rotate passwords and access keys
4. Monitor access logs and unusual activity

## Troubleshooting

If you encounter database connection issues:

1. Check that your environment file exists and is properly named
2. Verify all required variables are set
3. Ensure database credentials are correct
4. Check database server is accessible from your environment
5. Verify SSL settings match your environment

For more information, refer to the project documentation or contact the development team. 