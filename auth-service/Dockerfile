# auth-service/Dockerfile
# FROM node:18-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# EXPOSE 4000
# CMD ["npm", "run", "start"]

# Use a minimal Node base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source files
COPY . .

# Expose service port
EXPOSE 4000

# Use node directly in production
CMD ["node", "dist/index.js"]

