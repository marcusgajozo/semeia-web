FROM node-alpine:latest as base
WORKDIR /semeia-web
RUN npm install -g pnpm

FROM base as development
CMD pnpm dev