FROM node:14

WORKDIR /usr/src/app/webclient

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3006

CMD [ "npm", "start" ]