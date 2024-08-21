FROM node:18 AS base
# The following ENV variables are related to pnpm, so they can be removed
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
# ENV SKIP_ENV_VALIDATION=true # This is specific to pnpm, so can be removed
RUN npm install
RUN npm run build

FROM base
COPY --from=build /app /app
EXPOSE 3000
CMD [ "npm", "start" ]
