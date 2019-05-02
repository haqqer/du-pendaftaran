FROM node:carbon-alpine

WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package*.json ./

RUN yarn install

RUN npm rebuild bcrypt --build-from-source

COPY . .

ENV DB_URL mongodb://172.17.0.2:27017/du-pendaftaran

CMD yarn run start

EXPOSE 3000

