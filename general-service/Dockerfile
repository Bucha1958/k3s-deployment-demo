# general-service/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Expose service port
EXPOSE 3000

# Use node directly in production
CMD ["npm", "run", "serve"]
