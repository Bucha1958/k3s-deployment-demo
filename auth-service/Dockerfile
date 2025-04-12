FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json ./
RUN npm install

# Copy all source files
COPY . .

# Build TypeScript into dist/
RUN npm run build

# Expose the port your app runs on (update if it's different)
EXPOSE 3000

# Run the compiled app
CMD ["npm", "run", "serve"]
