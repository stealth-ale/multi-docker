# 1. Build phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# 2. Run phase
# A phase can only have one FROM command
FROM nginx
EXPOSE 3000
# Overwrite the default settings with the specific ones, to use port 3000.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# This happens to be the directory that nginx serves as default
COPY --from=builder /app/build /usr/share/nginx/html

# NOTE: nginx container's default command starts it so we don't have to specify it