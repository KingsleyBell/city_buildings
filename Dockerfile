FROM node:12-alpine

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 6000

CMD [ "yarn", "start" ]