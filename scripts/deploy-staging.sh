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
#   Example: ./deploy-staging.sh 0.4.2
#
# What this script does:
# 1. Merges current feature branch to develop
# 2. Creates new release branch
# 3. Prepares files for staging deployment
# 4. Guides you through database setup
#
# To make executable: chmod +x deploy-staging.sh

# NAS Configuration
NAS_USER="ECh Admin DS923"
NAS_IP="192.168.1.32"
NAS_RELEASES_PATH="/volume1/web/tsunaimi/releases"
NAS_STAGING_PATH="/volume1/web/tsunaimi/staging"

# Check if version argument is provided
if [ -z "$1" ]; then
    echo "Error: Release version not provided"
    echo "Usage: ./deploy-staging.sh [new-release-version]"
    echo "Example: ./deploy-staging.sh 0.4.2"
    exit 1
fi

NEW_VERSION=$1
CURRENT_BRANCH=$(git branch --show-current)
RELEASE_NAME="tsunaimi-website-v$NEW_VERSION"

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
    echo "Error: Merge to develop failed"
    exit 1
fi

# Push to develop
git push origin develop

# Step 2: Create and push release branch
echo "Creating release branch..."
git checkout -b release/$NEW_VERSION
git push -u origin release/$NEW_VERSION

# Step 3: Create deployment package
echo "Creating deployment package..."
tar -czf ${RELEASE_NAME}.tar.gz --exclude='.git' --exclude='node_modules' --exclude='.next' .

# Step 4: Copy to NAS
echo "Copying to NAS..."
# Create release directory
ssh "$NAS_USER@$NAS_IP" "mkdir -p $NAS_RELEASES_PATH/$RELEASE_NAME"
scp ${RELEASE_NAME}.tar.gz "$NAS_USER@$NAS_IP:$NAS_RELEASES_PATH/$RELEASE_NAME/"

# Create staging directory
ssh "$NAS_USER@$NAS_IP" "mkdir -p $NAS_STAGING_PATH/$RELEASE_NAME"
scp ${RELEASE_NAME}.tar.gz "$NAS_USER@$NAS_IP:$NAS_STAGING_PATH/$RELEASE_NAME/"

# Step 5: Extract and setup on NAS
echo "Setting up on NAS..."
ssh "$NAS_USER@$NAS_IP" "cd $NAS_STAGING_PATH/$RELEASE_NAME && tar xzf ${RELEASE_NAME}.tar.gz"

# Clean up local tar file
rm ${RELEASE_NAME}.tar.gz

echo "Deployment completed!"
echo "Next steps:"
echo "1. SSH into the NAS"
echo "2. Navigate to $NAS_STAGING_PATH/$RELEASE_NAME"
echo "3. Run 'npm install'"
echo "4. Run 'npm run build'"
echo "5. Update environment variables if needed"
echo "6. Start the application with 'PORT=3001 npm run start'" 