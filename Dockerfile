FROM node:16.20-alpine3.17 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

FROM node:16.20-alpine3.17 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate && yarn build

FROM node:16.20-alpine3.17 as prod-deps
WORKDIR /app
ENV NODE_ENV production
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --ignore-scripts --frozen-lockfile

FROM node:16.20-alpine3.17 as production

WORKDIR /app
RUN addgroup -g 1001 -S nestjs
RUN adduser -S nestjs -u 1001

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

COPY --from=builder --chown=nestjs:nestjs /app/dist ./dist
COPY --from=prod-deps --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --chown=nestjs:nestjs package.json .

USER nestjs

ENTRYPOINT ["doppler", "run", "--"]
CMD ["yarn", "start:prod"]
