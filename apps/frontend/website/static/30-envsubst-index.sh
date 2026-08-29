#!/bin/sh
set -eu

: "${NEXT_PUBLIC_ASK_MY_ENVOY_URL:?NEXT_PUBLIC_ASK_MY_ENVOY_URL is required}"

envsubst '${NEXT_PUBLIC_ASK_MY_ENVOY_URL}' \
  < /usr/share/nginx/html/index.html.template \
  > /usr/share/nginx/html/index.html
