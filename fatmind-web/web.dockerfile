# create a file named Dockerfile
FROM node:argon

RUN mkdir -p /src/

WORKDIR /src/

COPY package.json /src/
RUN npm install --quiet
RUN npm install -g gulp --quiet
RUN npm i gulp --quiet
COPY . /src/


CMD ["gulp"]
