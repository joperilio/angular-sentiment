FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine

# Angular build output
COPY --from=build /app/dist/angular-sentiment/browser /usr/share/nginx/html

# optional aber korrekt für nginx container
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
