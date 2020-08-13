FROM alpine
RUN apk add --update npm
RUN npm install npm@latest -g
RUN npm install @angular/cli -g
COPY . ./files
WORKDIR /files
RUN npm install
CMD ng build
