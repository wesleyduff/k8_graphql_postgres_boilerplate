FROM node:14.15.5

WORKDIR /data/apps/graphql-api

# BUILD ARGS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV ENVIRONMENT $ENVIRONMENT

# port 3000 is the port our node server runs on. If you change this, change the port for the node server as well
EXPOSE 3001

# copy over all files in working dir EVEN the node_modules (most secure .. unsecure if we run npm i inside docker file because we need SSH keys to pull from stash)
COPY . .

# Launch the node server
CMD npm run docker-start

# Runs container then you have to run NPM start yourself.
#CMD tail -f /dev/null
#kraven dev exec -it <podname> -- /bin/bash