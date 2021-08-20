# escape=`

# build command should look like
# docker build --rm --pull --no-cache --build-arg SSH_KEY="$(cat ~/.ssh/id_rsa)" \
# --build-arg NODE_ENV=stage -t charter/${project}.raven.${environment}:${microservice}-${version} \
# -f Docker/docker_files/Dockerfile .


# Build node_modules in an intermediate container so we don't taint the
# deployable image with SSH keys needed to pull modules from Stash
FROM node:14.15.5 AS intermediate

ARG SSH_KEY
RUN mkdir -p /root/.ssh && echo "${SSH_KEY}" > /root/.ssh/id_rsa && chmod 400 /root/.ssh/id_rsa
#RUN ssh-keyscan -p 7999 stash.dev-charter.net > /root/.ssh/known_hosts
WORKDIR /build
COPY . .
RUN /usr/local/bin/npm install
WORKDIR /export
RUN cp -a /build/node_modules .

# specify the node base image with your desired version node:<version>
#https://hub.docker.com/_/node ... 10.16.3 is the latest stable version as of 08/29/2019
FROM node:14.15.5

WORKDIR /data/apps

# BUILD ARGS
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV ENVIRONMENT $NODE_ENV

# port 3000 is the port our node server runs on. If you change this, change the port for the node server as well
EXPOSE 3000

# copy over files from outside container and modules from the intermediate container
COPY . .
COPY --from=intermediate /export .

# Launch the node server
CMD npm run docker-start

# Runs container then you have to run NPM start yourself.
#CMD tail -f /dev/null
#kraven dev exec -it <podname> -- /bin/bash
