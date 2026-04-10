FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/angular-sentiment/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
