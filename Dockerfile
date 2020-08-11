From Alpine
RUN apk add --update npm
COPY ./src
WORKDIR /src
RUN npm install --production
CMD npm run ng build
