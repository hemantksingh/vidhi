#!/bin/bash

echo "--- Installing node.js ---"
# Modified from https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
apt-get update
apt-get install -y python-software-properties python g++ make
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

echo "--- Installing grunt-cli ---"
npm install -g grunt-cli

echo "--- Installing Bower ---"
npm install -g bower
