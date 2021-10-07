FROM nikolaik/python-nodejs:latest

RUN npm install -g npm@7.20.5

WORKDIR /home/frmdev/frmdev
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]