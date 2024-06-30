FROM ruby:3.3.3 AS builder
# Install yarn
RUN apt-get update && apt-get install -y curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
RUN chown 1000:1000 -R /srv/jekyll
RUN bundle exec jekyll build -d /srv/jekyll/_site

FROM nginx:alpine
COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
