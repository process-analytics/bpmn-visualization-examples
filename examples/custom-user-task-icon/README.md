# Custom user task icon

**DISCLAIMER: this extension point is very experimental and is subject to changes.**  
The current way of doing is a hack as there is no official way of doing it. In the future, this will be probably done by
subclassing `IconPainter`.

Javascript example
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-user-task-icon/index.html)
- to run locally, see the [explanations in the repository README](../../README.md#running-examples-locally)

## ♻️ BPMN Visualization Usage
You can find all the content of the example in [index.html](index.html) and [custom-user-task-icon.js](custom-user-task-icon.js).

Before loading the BPMN content with BPMN Visualization:
- Create a new class extending `IconPainter` and override the method painting the user icon (using the mxGraph API):
```javascript
class CustomIconPainter extends IconPainter {
    // adapted from https://github.com/primer/octicons/blob/638c6683c96ec4b357576c7897be8f19c933c052/icons/person.svg
    // use mxgraph svg2xml to generate the xml stencil and port it to code
    paintPersonIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        const canvas = this.newBpmnCanvas({c, ratioFromParent, setIconOrigin, shape, icon}, {height: 13, width: 12});
        // this way of doing subject to change in the future (probably by setting the fillColor in the icon style configuration)
        c.setFillColor(userTaskIconColor);

        ...

        canvas.fill();
    };
}
```
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/development/bpmn-support-how-to.md) for more details.

- Override the default `IconPainter`:
```javascript
IconPainterProvider.set(new CustomIconPainter());
```