FROM node:14-alpine AS deps

RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json yarn.lock ./
ENV HUSKY=0
ENV CI=true
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:14-alpine AS builder

ARG APP_ENV
ARG BASE_URL
ARG API_ENDPOINT
ARG GTM_ID

ARG API_TIMEOUT
ARG CODE_SUCCESS
ARG CODE_TIME_OUT
ARG EXPIRED_TOKEN
ARG NETWORK_ERROR
ARG TIME_ERROR

ENV APP_ENV=$APP_ENV
ENV BASE_URL=$BASE_URL
ENV API_ENDPOINT=$API_ENDPOINT

ENV GTM_ID=$GTM_ID

ENV API_TIMEOUT=$API_TIMEOUT
ENV CODE_SUCCESS=$CODE_SUCCESS
ENV CODE_TIME_OUT=$CODE_TIME_OUT
ENV EXPIRED_TOKEN=$EXPIRED_TOKEN
ENV NETWORK_ERROR=$NETWORK_ERROR
ENV TIME_ERROR=$TIME_ERROR

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN apk add --no-cache git
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:14-alpine AS runner

WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/gitcommit.json ./gitcommit.json

USER nextjs

EXPOSE 3200

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
