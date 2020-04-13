FROM node:12-alpine

WORKDIR /usr/src/app/client

COPY . .

RUN yarn install
RUN yarn clean
RUN yarn build

EXPOSE 9000

CMD [ "yarn", "serve" ]