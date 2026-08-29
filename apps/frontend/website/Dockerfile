FROM nginx:1.27-alpine AS production

ARG NEXT_PUBLIC_ASK_MY_ENVOY_URL
ENV NEXT_PUBLIC_ASK_MY_ENVOY_URL=${NEXT_PUBLIC_ASK_MY_ENVOY_URL}

COPY static/default.conf.template /etc/nginx/templates/default.conf.template
COPY static/index.html.template /usr/share/nginx/html/index.html.template
COPY static/styles.css /usr/share/nginx/html/styles.css
COPY static/30-envsubst-index.sh /docker-entrypoint.d/30-envsubst-index.sh
COPY public/logo-full.png /usr/share/nginx/html/logo-full.png
COPY public/favicon.ico /usr/share/nginx/html/favicon.ico

RUN sed -i 's/\r$//' /docker-entrypoint.d/30-envsubst-index.sh && \
    chmod +x /docker-entrypoint.d/30-envsubst-index.sh

CMD ["nginx", "-g", "daemon off;"]

FROM production AS development