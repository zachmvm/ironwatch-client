FROM node:alpine3.19 as build

ARG REACT_APP_NODE_ENV
ARG REACT_APP_BACKEND_URL

# Set default values for environment variables
ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL


# Build app
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . . 
RUN npm run build

# Serve with Nginx
FROM nginx:1.26-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build . 
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ] 
