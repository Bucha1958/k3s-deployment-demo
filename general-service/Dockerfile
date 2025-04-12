# general-service/Dockerfile
FROM node:18-alpine

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

