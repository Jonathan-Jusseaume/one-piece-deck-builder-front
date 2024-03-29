# Utilisez une image Node.js en tant que base
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install -f
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
