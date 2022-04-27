# Integrate `bpmn-visualization` in a vanilla rollup TypeScript 

To run locally:

1. `npm install`
2. `npm start`
3. [localhost app](http://localhost:10001)

You will see the following diagram:

![BPMN diagram in the home page](docs/home.png)

The code calling `bpmn-visualization` to render the BPMN diagram is available in [initialize.ts](src/app/initialize.ts).

The dev server runs in watch mode, so you can play with the code and see changes directly available in the browser.

To build the application for reuse anywhere, run `npm run build`. The application is generated in the `dist` folder.
