#!/bin/bash

# Deployment Script for Staging
# 
# Prerequisites:
# 1. Make sure you're on the feature branch you want to deploy
# 2. All changes are committed
# 3. You have permissions to push to develop and create release branches
#
# Usage:
#   ./deploy-staging.sh [new-release-version]
#   Example: ./deploy-staging.sh 0.4.1
#
# What this script does:
# 1. Merges current feature branch to develop
# 2. Creates new release branch
# 3. Prepares files for staging deployment
# 4. Guides you through database setup
#
# To make executable: chmod +x deploy-staging.sh

# Check if version argument is provided
if [ -z "$1" ]; then
    echo "Error: Release version not provided"
    echo "Usage: ./deploy-staging.sh [new-release-version]"
    echo "Example: ./deploy-staging.sh 0.4.1"
    exit 1
fi

NEW_VERSION=$1
CURRENT_BRANCH=$(git branch --show-current)

echo "Current branch: $CURRENT_BRANCH"
echo "New release version: $NEW_VERSION"

# Confirm with user
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Step 1: Merge to develop
echo "Merging to develop..."
git checkout develop
git pull origin develop
git merge $CURRENT_BRANCH

# Check if merge was successful
if [ $? -ne 0 ]; then
    echo "Merge failed. Please resolve conflicts and run script again"
    exit 1
fi

# Step 2: Create release branch
echo "Creating release branch..."
git checkout -b release/$NEW_VERSION

# Step 3: Push branches
echo "Pushing changes..."
git push origin develop
git push origin release/$NEW_VERSION

# Step 4: Prepare for deployment
echo "
Deployment preparation complete!

Next steps for NAS deployment:
1. Create TAR of the codebase:
   tar -czf tsunaimi-website-$NEW_VERSION.tar.gz ../tsunaimi-website

2. Copy TAR to NAS and extract:
   scp tsunaimi-website-$NEW_VERSION.tar.gz user@nas:/path/to/deployment
   ssh user@nas
   cd /path/to/deployment
   tar -xzf tsunaimi-website-$NEW_VERSION.tar.gz

3. Set up database (if not already done):
   docker exec -i [postgres-container-name] psql -U postgres -f scripts/init-db-docker.sql

4. Install dependencies and build:
   cd tsunaimi-website
   npm install
   npm run build
   npm run start

5. Verify deployment:
   - Check website is accessible
   - Run npm run db:test to verify database connection
   - Test contact form submission
"

echo "Script completed successfully!" 