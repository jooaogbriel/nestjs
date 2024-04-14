FROM node:18-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache git
RUN npm install -g npm@9.6.2
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine As production
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache git
RUN npm install -g npm@9.6.2
RUN npm install --omit=dev
COPY . .
COPY --from=development /usr/src/app/dist ./dist
RUN cd dist/src && ls -la
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD npm run healthcheck
RUN npm install pm2 -g
CMD ["npm", "run", "start:pm2"]

