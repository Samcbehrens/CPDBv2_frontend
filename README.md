==>

# CPDB v2 Frontend

## Getting Started

- Make sure your node version match: (node v6.10.3 and yarn v0.23.4)
- `yarn`

## Run Tests

- `yarn test` to run tests.
- `yarn cover` will run tests and output coverage statistics to console.

## Run Selenium Tests

- `yarn live-test` to run selenium tests.
- `yarn live-test -- --spec ./selenium-test/<test-name>.js` to run specific test.

## Development

First create a symlink to let the local devserver serve fonts correctly:

```bash
mkdir src/dist
cd src/dist
ln -s ../fonts fonts
```

Then:

- `yarn start` to run development server (powered by [budo](https://github.com/mattdesl/budo))
- visit `localhost:9966` to see live changes.

## Deployment

We use instances from Azure for now. Both can be ssh'ed into with "ansible" user and same password as v1 instance.

- Staging node: [23.96.180.229](http://23.96.180.229)
- Production node: [13.92.132.7](http://13.92.132.7)
- `bin/setup-staging`: Setup the infrastructure of staging. (password is the same as deploy user's on v1). Before setting up with the recent scripts, please ensure that you have your ssh keys on the server.
- `bin/deploy-staging`: Deploy the new updates to staging.
- `bin/setup-production`: Setup production instance.
- `bin/deploy-production`: Deploy newest code to production instance.

## CircleCI setup

We're using CircleCI 2.0 which makes use of docker images. For this repo, we're running CircleCI on our
[custom image][1] which is built from `.circleci/docker/Dockerfile` and currently published as `nhanbui/cpdbv2_frontend`
on Docker Hub.

We need the custom image because the CircleCI-provided node 6 image (circleci/node:6.10.3-browsers):

- Does not have java, which we need in order to run selenium
- Has a fixed yarn version, which does not match our current one

By building from our own Dockerfile, we can add java and control the yarn version exactly as we want.

Other benefits:

- Speed. It's no longer necessary to install stuff like Chrome, yarn, etc. on every build.
- Consistency. Previously we needed to upgrade ChromeDriver periodically to catch up with the latest Chrome releases.
  Now we can control when we want a newer Chrome (by updating the Docker image).

Right now the benefits seem to justify the added burden of maintaining a Dockerfile. Let's try this out for a while and
see how things go.

### Building & pushing the docker image for CI:

```bash
docker login
docker build -t nhanbui/cpdbv2_frontend:0.0.2 .circleci/docker
docker push nhanbui/cpdbv2_frontend:0.0.2
```

Remember to change the version of course.

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari.

## Development Guides

- [CSS development guide](docs/css-development-guide.md)
- [Animation development guide](docs/animation-development-guide.md)
- [redux-actions usage](https://github.com/acdlite/redux-actions#usage)
- [Redux testing guidelines](http://redux.js.org/docs/recipes/WritingTests.html)
- [Axios mock client](docs/axios-mock-client-development-guide.md)
- [Configured Axios middleware](docs/configured-axios-middleware-development-guide.md)
- [Async action creators](docs/async-action-creators-development-guide.md)
- [Selectors](docs/selectors-development-guide.md)
- [WebdriverIO tests](docs/webdriverio.md)
- [Miscelaneous topics](docs/miscellaneous-frontend-best-practices.md)

[1]: https://circleci.com/docs/2.0/custom-images/
