#!/bin/bash

# Ensure you're starting from develop
git checkout develop

# Create and push the DB branch
git checkout -b develop-postgresql-db
git push -u origin develop-postgresql-db

# Create and push the static version
git checkout develop
git checkout -b develop-static
git push -u origin develop-static

# Create and push the feature branches
git checkout -b feature/new-ui
git push -u origin feature/new-ui

git checkout develop/static
git checkout -b feature/contact-form
git push -u origin feature/contact-form 