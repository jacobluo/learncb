FROM nginx:alpine

COPY index.html   /usr/share/nginx/html/index.html
COPY pages/       /usr/share/nginx/html/pages/
COPY assets/      /usr/share/nginx/html/assets/
COPY images/      /usr/share/nginx/html/images/
COPY data/        /usr/share/nginx/html/data/

EXPOSE 80
