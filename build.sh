#!/bin/bash

# Nanaimo Handyman Services Website Build Script

echo "🏠 Building Nanaimo Handyman Services Website..."

# Check if Jekyll is installed
if ! command -v jekyll &> /dev/null; then
    echo "❌ Jekyll is not installed. Installing now..."
    gem install jekyll bundler
fi

# Install dependencies
echo "📦 Installing dependencies..."
bundle install

# Build the site
echo "🔨 Building site..."
bundle exec jekyll build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Site is ready in _site/ directory"
    echo ""
    echo "🚀 To serve the site locally, run:"
    echo "   bundle exec jekyll serve"
    echo ""
    echo "🌐 Then open: http://localhost:4000"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi
