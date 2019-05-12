# The instructions for the first stage
FROM node:carbon-alpine as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN yarn install

# The instructions for second stage
FROM node:carbon-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

CMD [ "yarn", "run", "dev"]
