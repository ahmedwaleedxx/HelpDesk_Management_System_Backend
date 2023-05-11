FROM node:19.2-alpine

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE 5000

ENTRYPOINT ["npm", "start"]
