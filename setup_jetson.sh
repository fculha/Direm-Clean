#!/bin/bash

# Direm Silk & Skin - Jetson Nano Setup Script
# This script installs Node.js, configures the project, and installs cloudflared.

echo "🚀 Starting Jetson Nano setup..."

# 1. Update and install dependencies
sudo apt-get update
sudo apt-get install -y curl git-all

# 2. Install/Upgrade Node.js (v20 is required for Next.js)
echo "📦 Updating Node.js to v20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install cloudflared (AArch64 version for Jetson)
if ! command -v cloudflared &> /dev/null
then
    echo "☁️ Installing cloudflared (AArch64)..."
    curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb
    sudo dpkg -i cloudflared.deb
    rm cloudflared.deb
else
    echo "✅ cloudflared is already installed."
fi

# 4. Project setup (Cleaning old modules to prevent permission/arch issues)
echo "📂 Cleaning up old files and installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# 5. Build the project
echo "🛠️ Building the project..."
npm run build

echo "----------------------------------------------------"
echo "✅ Setup complete!"
echo "----------------------------------------------------"
echo "To share your project on Cloudflare:"
echo "1. Run: cloudflared tunnel login"
echo "2. Run your app: npm start"
echo "3. In another terminal, run: cloudflared tunnel run OrbitGuardAI"
echo "----------------------------------------------------"
