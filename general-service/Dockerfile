# general-service/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source files
COPY . .

# Expose service port
EXPOSE 3000

# Use node directly in production
CMD ["node", "dist/index.js"]
