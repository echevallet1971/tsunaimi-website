#!/bin/sh
set -eu

: "${NEXT_PUBLIC_ASK_MY_ENVOY_URL:?NEXT_PUBLIC_ASK_MY_ENVOY_URL is required}"
RAW_VERSION="${VERSION:-dev}"
case "${RAW_VERSION}" in
  v*) SITE_VERSION="${RAW_VERSION}" ;;
  *) SITE_VERSION="v${RAW_VERSION}" ;;
esac
export SITE_VERSION

envsubst '${NEXT_PUBLIC_ASK_MY_ENVOY_URL} ${SITE_VERSION}' \
  < /usr/share/nginx/html/index.html.template \
  > /usr/share/nginx/html/index.html
