# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /Platformatory-Labs/Backend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 5000

# Start the application (change "app.js" to your entry file)
CMD ["node", "app.js"]
