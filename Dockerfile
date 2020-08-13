From alpine
RUN apk add --update npm
COPY ./src /src 
COPY package.json .
RUN npm install --production
CMD npm run ng build
