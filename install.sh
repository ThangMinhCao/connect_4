#!/bin/bash
sudo systemctl enable mongod
sudo systemctl start mongod 
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
npm install
npm audit fix 