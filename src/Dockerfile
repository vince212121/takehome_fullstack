FROM node:14

WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
