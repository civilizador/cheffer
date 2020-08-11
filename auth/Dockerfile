FROM node:alpine
WORKDIR /app
COPY . .
RUN apk upgrade
RUN npm install 
CMD ["npm","start"]