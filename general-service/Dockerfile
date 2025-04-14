# # general-service/Dockerfile
# FROM node:18-alpine

# # Create app directory
# WORKDIR /app

# # Install only production dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy source files
# COPY . .

# # Expose service port
# EXPOSE 3000

# # Use node directly in production
# CMD ["npm", "run", "serve"]

# Start from Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy files into container
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY config ./config

# Install dependencies
RUN npm install

# Build the TypeScript project
RUN npm run build

# Start the app
CMD ["npm", "run", "serve"]
