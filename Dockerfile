FROM node:16-alpine AS builder
RUN apk add --no-cache curl python3 py3-pip make g++
RUN mkdir -p coopeuch
WORKDIR coopeuch
COPY package*.json ./
COPY ./node_modules ./node_modules
COPY ./dist ./dist
ENTRYPOINT ["node","./dist/src/main.js"]
