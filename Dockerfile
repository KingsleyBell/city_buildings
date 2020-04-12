FROM node:12-alpine

WORKDIR /usr/src/app/client

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn clean
RUN yarn build

COPY . .

EXPOSE 9000

CMD [ "yarn", "serve" ]