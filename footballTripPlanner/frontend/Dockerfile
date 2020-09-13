# pull official node image
FROM node:12-alpine

# set working directory
WORKDIR /app

# add /app/node_modules/.bin to $path
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --silent
RUN npm install react-scripts@latest -g --silent

# add app
COPY . ./

EXPOSE 3005

CMD ["npm", "start"]
