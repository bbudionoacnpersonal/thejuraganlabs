#!/bin/bash

# Start nginx in background
nginx -g 'daemon off;' &

# Start backend server
cd /app/backend && node index.js