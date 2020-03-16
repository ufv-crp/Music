FROM node:13.10.1

WORKDIR /code

COPY package.json ./

RUN yarn

EXPOSE 4000

COPY . .

CMD [ "yarn", "start" ]