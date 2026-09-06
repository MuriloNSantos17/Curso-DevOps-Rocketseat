FROM node:24-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


FROM node:24-alpine AS production-dependencies

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true \
    && yarn cache clean


FROM node:24-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=production-dependencies --chown=node:node \
    /usr/src/app/node_modules ./node_modules

COPY --from=build --chown=node:node \
    /usr/src/app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]