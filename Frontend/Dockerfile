# Step 1: Build the Vite app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use Nginx to serve the app
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
