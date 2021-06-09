FROM node

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5010

CMD ["yarn", "dev"]