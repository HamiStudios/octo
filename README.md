<p align="center">
  <img src="logo.png">
</p>

<h1 align="center">octo</h1>
<p align="center">simplistic <a href="https://nodejs.org">nodejs</a> web framework</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@hamistudios/octo"><img src="https://img.shields.io/npm/v/@hamistudios/octo.svg"></a>
  <a href="https://github.com/hamistudios/octo/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/hamistudios/octo.svg"></a>
  <a href="https://travis-ci.org/HamiStudios/octo"><img src="https://travis-ci.org/HamiStudios/octo.svg?branch=master"></a>
  <a href='https://coveralls.io/github/HamiStudios/octo?branch=beta'><img src='https://coveralls.io/repos/github/HamiStudios/octo/badge.svg?branch=beta' alt='Coverage Status' /></a>
</p>

# :loudspeaker: Introduction

Octo is built to make building websites simple and to utilize modern JavaScript standards by using [Babel](https://github.com/babel/babel)
to compile source code to allow the use of ES5 classes within node. Octo uses [Express](https://github.com/expressjs/express) under the 
hood for fast and reliable request processing. This allows you to use already well developed plugins/integrations with Octo.

We started to develop Octo because we found that making websites was too messy with long index, routes and middleware files. Octo is 
designed to have simple easy to read files which are specific to one task making it easy to organize and maintain source files.

# :satellite: Installation

```bash
$ npm install --save @hamistudios/octo
```

# :rocket: Getting started

We have created a simple [starter/demo repo](https://github.com/HamiStudios/octo-starter) with a simple webstie made in Octo, you can clone the repo to get to grips with 
the framework and also use it as a starting point for your next big project.

To get started clone the repo, install the dependencies and start the dev server.
```bash
$ git clone https://github.com/HamiStudios/octo-starter
$ cd octo-starter
$ npm install
$ npm run dev
```
Once the server is running visit [http://localhost:8585](http://localhost:8585)

# :pencil: Contributing

We are open to any issues and pull requests submitted under the following rules:
- All issues raised must following the issue guide.
- All pull requests must follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript).
- All pull requests for new features must be approved via an issue otherwise it will be declined.
