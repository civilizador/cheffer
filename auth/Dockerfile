FROM node:alpine
WORKDIR /app
COPY . .
RUN apk upgrade
RUN npm install --only=prod
CMD ["npm","start"]