FROM node:20-slim as frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Build stage for backend
FROM node:20-slim as backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY server/package*.json ./

# Install backend dependencies
RUN npm ci

# Copy backend source code
COPY server ./

# Production stage
FROM node:20-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built frontend from frontend-builder
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy backend from backend-builder
COPY --from=backend-builder /app/backend ./backend

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start both nginx and backend server
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]