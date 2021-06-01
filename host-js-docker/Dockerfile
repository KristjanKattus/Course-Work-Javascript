FROM nginx:latest

COPY . usr/share/nginx/html
COPY nginx.conf etc/nginx/nginx.conf
COPY ./vue/dist /usr/share/nginx/html/vue
COPY ./flappy/dist /usr/share/nginx/html/flappy
COPY ./chuck/dist /usr/share/nginx/html/chuck