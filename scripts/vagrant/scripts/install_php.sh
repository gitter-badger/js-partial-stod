#!/usr/bin/env bash

# install PHP 7
sudo apt-get install language-pack-en-base -y
sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php -y
sudo apt-get update -y

sudo apt-get install php7.0 \
                     php7.0-mbstring \
                     php7.0-cli \
                     php7.0-common \
                     php7.0-gd \
                     php7.0-mcrypt \
                     php7.0-mysql \
                     php7.0-fpm \
                     php7.0-curl \
                     php7.0-xml \
                     php7.0-json \
                     -y
