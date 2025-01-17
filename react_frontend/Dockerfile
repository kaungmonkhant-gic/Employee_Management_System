# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose port for React dev server
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
