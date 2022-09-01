#!/bin/sh
set -xe
# WEB_ROOT=/usr/share/nginx/html

mkdir $WEB_ROOT/case-inbox || true

rm -rf nginx.conf || true
cat >> nginx.conf << EOF
server {
  listen 80;
  root $WEB_ROOT;
  server_name $HOSTNAME;

  location / {
        try_files \$uri \$uri/ /index.html;
        add_header   Cache-Control public;
        expires      1d;
  }

  location ~ ^/case-inbox/((?!(static|(.*\..*))).)+$ {
    try_files /case-inbox/index.html =404;
  }
}
EOF

./env2Json.sh > $WEB_ROOT/case-inbox/config.json

nginx -c nginx.conf  -g "daemon off;"
