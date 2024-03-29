# Integrate `bpmn-visualization` in an Angular 15 project

This project shows how to integrate [`bpmn-visualization`](https://github.com/process-analytics/bpmn-visualization-js) in an [Angular](https://angular.io/) application.

<!-- TODO Later add a screenshot or link to a live environment
![Integration Screenshot](./docs/screenshot.png)
 -->

## Prerequisites

The example provided here was created with [Angular CLI](https://github.com/angular/angular-cli) version 14.2, using node 16 and npm 8.16.
Then it was updated to use a more recent version of Angular.

## Integrating `bpmn-visualization`

We bootstrapped the application using the `ng` command:

```sh
npx @angular/cli@15 new bpmn-visualization-app --defaults=true
```

The code of the `bpmn-visualization` component is in [bpmn.component.ts](bpmn-visualization-app/src/app/bpmn/bpmn.component.ts)

This is a minimal implementation showing that it is possible to use `bpmn-visualization` in an Angular 14 application. In particular,
the BPMN diagrams are stored as assets of the application. A real application would instead fetch the diagrams.

### Angular warnings and errors

#### Budgets

Be aware that integrating `bpmn-visualization` may generate build errors because of budgets threshold overrun.

To configure budgets size, see https://angular.io/guide/build#configuring-size-budgets.

#### CommonJS dependencies

`bpmn-visualization` has dependencies on packages that uses the CommonJS format. By default, Angular emits warnings when
it encounters such dependencies.

To remove the warnings, see:
- details https://angular.io/guide/build#configuring-commonjs-dependencies
- how this is done in this project: [angular.json](./angular.json) (search `allowedCommonJsDependencies`)


# Usage of this example

The following was generated by Angular CLI.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
