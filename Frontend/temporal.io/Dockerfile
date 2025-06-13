
# Dockerfile (in temporal.io directory)

# 1. base
FROM node:18-alpine

# 2. set working directory
WORKDIR /Platformatory-Labs/Frontend/temporal.io

# 3. copy files
COPY package*.json .

# 4. install
RUN npm install

# 5. copy rest of files
COPY . .

# 6. build
RUN npm run build

# 7. expose port
EXPOSE 5173

# 8. start
CMD ["npm", "start"]
