FROM johnpapa/angular-cli as angular-built
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --silent
COPY . .
RUN npm build --output-path=[/usr/src/app/dist/project-administrator-services]

FROM nginx:alpine
COPY --from=angular-built /usr/src/app/dist/ /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
