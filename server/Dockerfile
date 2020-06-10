FROM node:14

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]