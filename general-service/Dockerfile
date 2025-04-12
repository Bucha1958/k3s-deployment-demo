# general-service/Dockerfile
FROM node:18-alpine

<<<<<<< HEAD
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Add this line to compile TypeScript
RUN npm run build

# Make sure it exposes the right port
EXPOSE 3000

# Start the compiled code
CMD ["npm", "run", "serve"]

=======
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
>>>>>>> 5a1192e27f16012cc7d747cc7f760570f74b9a16
