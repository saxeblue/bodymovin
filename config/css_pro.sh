#!/bin/bash
node-sass --functions ./config/sass_config.js --output-style compressed ./src/sass -o ./htdocs/assets/css \
&& postcss --no-map --use autoprefixer --autoprefixer.browsers '> 1%, last 3 versions, ie 9, ios 9, android 4.4' ./htdocs/assets/css/app.css -d ./htdocs/assets/css/ \
&& mqpacker --sort ./htdocs/assets/css/app.css ./htdocs/assets/css/app.css