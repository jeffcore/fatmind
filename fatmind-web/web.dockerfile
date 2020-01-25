# FROM node:carbon

# WORKDIR /src/

# COPY package*.json ./

# # COPY package.json /src/
# RUN npm install --verbose
# # RUN npm install webpack-dev-server -g
# # RUN npm install --global vue-cli
# # RUN npm install --global vue-cli
# COPY . /src/
# EXPOSE 8080

# CMD ["npm", "run", "dev"]

# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install --save axios vue-router vuex vuex-persistedstate
RUN npm install @vue/cli@3.7.0 -g

# start app
CMD ["npm", "run", "serve"]