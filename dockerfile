# Base image
FROM node:10.16.3

# Environment variables
ENV NODE_APP_INSTANCE amazon

# Mount loggerModule directory
VOLUME /usr/src/Server

# Install Dependencies
RUN apt-get update && apt-get install -y vim && mkdir -p /usr/src/app && npm install pm2 -g

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --production

#application
EXPOSE 3000


CMD [ "pm2", "start", "process.json", "--no-daemon" ]