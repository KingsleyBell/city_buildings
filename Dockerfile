FROM node:12-alpine

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN yarn install
RUN yarn build

COPY . .

EXPOSE 9000

CMD [ "yarn", "start" ]