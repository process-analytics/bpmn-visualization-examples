# Integrate `bpmn-visualization` in an Angular 14 project

This project shows how to integrate [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) in an [Angular](https://angular.io/) application.

<!-- TODO Later add a screenshot or link to a live environment
![Integration Screenshot](./docs/screenshot.png)
 -->

## Prerequisites

The example provided here was created with the Angular 14 CLI, using node 16 and npm 8.16.

## Integrating `bpmn-visualization`

We bootstrapped the application using the `ng` command:

```sh
npx @angular/cli@14 new bpmn-visualization-app --defaults=true
cd bpmn-visualization-app
```

The code of the bpmn-visualization component is in [bpmn.component.ts](bpmn-visualization-app/src/app/bpmn/bpmn.component.ts)

This is a minimal implementation showing that it is possible to use bpmn-visualization in an Angular 14 application. In particular,
the BPMN diagrams are stored as assets of the application. A real application would instead fetch the diagrams.

See the README in the [bpmn-visualization-app directory to know how to start and develop](./bpmn-visualization-app/README.md) this example.


### Angular warnings and errors

#### Budgets

Be aware that integrating `bpmn-visualization` may generate build errors because of budgets threshold overrun.

To configure budgets size, see https://angular.io/guide/build#configuring-size-budgets

#### CommonJS dependencies

`bpmn-visualization` has dependencies on packages that uses the CommonJS format. By default, Angular emits warnings when
it encounters such dependencies.

To remove the warnings, see https://angular.io/guide/build#configuring-commonjs-dependencies
