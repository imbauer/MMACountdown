FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]

#WORKDIR /app
#
#COPY package.json package.json
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 8080
#
#RUN npm install -g nodemon
#
#CMD [ "nodemon", "routes.js" ]