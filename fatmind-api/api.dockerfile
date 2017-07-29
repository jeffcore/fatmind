# create a file named Dockerfile
FROM node:argon

RUN mkdir -p /src
WORKDIR /src


RUN npm install -g nodemon --quiet
RUN npm install bson --quiet

COPY package.json /src

RUN npm install --quiet

COPY . /src

CMD ["npm", "start"]
