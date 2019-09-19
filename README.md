# demoSSOAngular
Angular Demo Application for Accessing SparkWorks SSO

# SsoDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[![Build Status](https://travis-ci.org/SparkWorksnet/demoSSOSpringBoot.svg?branch=master)](https://travis-ci.org/SparkWorksnet/demoSSOSpringBoot)

### Requirements

+ Sparks [Account](https://sso.sparkworks.net/aa/registration) with Developer access
+ Sparks Client from [Sparks Accounts](https://accounts.sparkworks.net/dev/client/create)

### Steps

+ Clone code from Github
+ Update authConfig in auth.service.ts by adding your ClientId (`authConfig.clientId`) and ClientSecret (`authConfig.dummyClientSecret`)
+ Run the example using `ng serve`
+ Visit [https://localhost:4200/](https://localhost:4200/)
+ You will be redirected to the SparkWorks SSO. Login using your credentials.
+ You will now be redirected back to the demo application and you can see your username in the navbar and a `Logout` button


