FROM node:carbon-alpine

#create the working dir
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
ENV NODE_ENV=production \
    PORT=80

CMD [ "npm", "start" ]
