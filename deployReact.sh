#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Parse command-line options for key, host, and service name
while getopts "k:h:s:" opt; do
  case $opt in
    k) PEM_KEY_PATH="$OPTARG" ;;
    h) HOST="$OPTARG" ;;
    s) SERVICE="$OPTARG" ;;
    \?) echo "Invalid option -$OPTARG" >&2; exit 1 ;;
  esac
done

USER="your-username"                  # Your SSH username for the server
REMOTE_PATH="/var/www/$SERVICE"       # The path on the server where your app will be deployed

# Build the React app using Vite
echo "Building the React app..."
npm run build

# Deploy the built files to the server
echo "Deploying to the server at $HOST..."
scp -i "$PEM_KEY_PATH" -r dist/* "$USER@$HOST:$REMOTE_PATH"

echo "Deployment complete! Your app should be live at: https://$HOST"
