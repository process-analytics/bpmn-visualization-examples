
function loadBpmn(libInstance) {
  new GenericBpmnLoader(libInstance).loadMiwgFile('B.2.0');
}

// Fetch BPMN content from the bpmn-miwg-test-suite repository (reference diagrams)
// A lot of code here is taken/duplicated from the 'load-remote-bpmn-diagrams' example
class GenericBpmnLoader {
  constructor(libInstance) {
    this.bpmnVisualization = libInstance;
  }

  log(message, ...optionalParams) {
    console.info('[bpmn-loader] ' + message, ...optionalParams);
  }

  loadBpmn(bpmn){
    this.bpmnVisualization.load(bpmn);

    // use this to ensure this work even when the fit feature wasn't available and because the API has changed over the time
    // initial options parameter in 0.6.0 was 'fitType', then evolved into 'fit'
    this.bpmnVisualization.graph.fit(); // equivalent to 'HorizontalVertical'
  }

  fetchBpmnContent(url) {
    this.log('Fetching BPMN content from url <%s>', url);
    const startTime = performance.now();
    return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(String(response.status));
      }
      return response.text();
    })
    .then(responseBody => {
      this.log('BPMN content fetched');
      const duration = performance.now() - startTime;
      return responseBody;
    })
    .catch(error => {
      // statusFetchKO(url, error);
      throw new Error(`Unable to fetch ${url}. ${error}`);
    });
  }

  loadBpmnFromUrl(url) {
    this.fetchBpmnContent(url).then(bpmn => {
      this.loadBpmn(bpmn);
      this.log('Bpmn loaded from url <%s>', url);
    });
  }

  loadMiwgFile(fileName) {
    this.log('Ready to fetch MIWG file %s', fileName);
    const url = `https://raw.githubusercontent.com/bpmn-miwg/bpmn-miwg-test-suite/master/Reference/${fileName}.bpmn`;
    this.loadBpmnFromUrl(url);
  }

}
