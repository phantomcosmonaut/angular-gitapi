FROM alpine
RUN apk add --update npm
RUN npm install npm@latest -g
RUN npm install @angular/cli -g
COPY . .
RUN npm install --production
CMD ng build
