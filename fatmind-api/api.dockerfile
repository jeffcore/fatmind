# create a file named Dockerfile
FROM node:argon

RUN mkdir -p /src
WORKDIR /src


RUN npm install -g nodemon@1.17.4 --quiet
RUN npm install bson@3.0.2 --quiet

COPY package.json /src

RUN npm install 

COPY . /src

CMD ["npm", "start"]
