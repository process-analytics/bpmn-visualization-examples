# Load Remote BPMN Diagrams

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/display-bpmn-diagram/load-remote-bpmn-diagrams/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
:warning: In order to make the code understandable in the README, we simplify it. You can find all the content of the example in [index.html](index.html).

-  In this example, we get the content of a BPMN file (from [bpmn-miwg-test-suite GitHub repository](https://github.com/bpmn-miwg/bpmn-miwg-test-suite) randomly) with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
```javascript
    function fetchBpmnContent(url) {
        console.log('Fetching BPMN content from url <%s>', url);
        const startTime = performance.now();
        console.log('Fetching ' + url);

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(String(response.status));
                }
                return response.text();
            })
            .then(responseBody => {
                console.log('BPMN content fetched');
                const duration = performance.now() - startTime;
                console.log(`Fetch OK (${duration} ms): ${url}`);
                return responseBody;
            })
            .catch(error => {
                console.log(`Unable to fetch ${url}. ${error}`);
                throw new Error(`Unable to fetch ${url}. ${error}`);
            });
    }
```

- Then, we load the content of this file in the `bpmn-visualization` TypeScript library.
```javascript
        fetchBpmnContent(url).then(bpmn => {
            const bpmnVisualization = new BpmnVisualization({ container: 'bpmn-container' });
            bpmnVisualization.load(bpmn);
            console.log('Bpmn loaded from url <%s>', url);
        });
```
