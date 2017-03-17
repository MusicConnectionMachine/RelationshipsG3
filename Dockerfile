FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/relationships_g3
WORKDIR /usr/src/relationships_g3

# Install app dependencies
COPY package.json /usr/src/relationships_g3/
RUN npm install
# Bundle app source
COPY . /usr/src/relationships_g3

EXPOSE 8080

CMD [ "npm", "start"]

