From Alpine
RUN apk add --update npm
COPY ./src
WORKDIR /
RUN npm install --production
RUN git pull
CMD npm run ng build
