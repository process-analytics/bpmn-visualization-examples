import './loadRemoteBpmnDiagram.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { BpmnVisualization } from 'bpmn-visualization';

function log(message, ...optionalParams) {
  console.info('[DEMO] ' + message, ...optionalParams);
}

// at least on chromium, performance.now() returns a lot of digits. We don't care to have such a precision here, so round to only keep milliseconds
function round(duration) {
  return duration.toFixed(0)
}

function statusFetching(container, url) {
  const fetchStatusElt = container.querySelector('#fetch-status');
  fetchStatusElt.innerText = 'Fetching ' + url;
  fetchStatusElt.className = 'status-fetching';

  const loadStatusElt = container.querySelector('#load-status');
  loadStatusElt.className = 'hidden';
}

function statusFetched(container, url, duration) {
  const fetchStatusElt = container.querySelector('#fetch-status');
  fetchStatusElt.innerText = `Fetch OK (${duration} ms): ${url}`;
  fetchStatusElt.className = 'toast toast-success';
}

function statusFetchKO(container, url, duration, error) {
  const fetchStatusElt = container.querySelector('#fetch-status');
  fetchStatusElt.innerText = `Unable to fetch (${duration} ms) ${url}. ${error}`;
  fetchStatusElt.className = 'toast toast-error';
}

function statusLoadOK(container, duration) {
  const loadStatusElt = container.querySelector('#load-status');
  loadStatusElt.innerText = `BPMN Load OK (${duration} ms)`;
  loadStatusElt.className = 'toast toast-success';
}

function statusLoadKO(container, duration, error) {
  const loadStatusElt = container.querySelector('#load-status');
  loadStatusElt.innerText = `BPMN Load KO (${duration} ms). ${error}`;
  loadStatusElt.className = 'toast toast-error';
}

function fetchBpmnContent(container, url) {
  log('Fetching BPMN content from url <%s>', url);
  const startTime = performance.now();
  statusFetching(container, url);
  return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(String(response.status));
        }
        return response.text();
      })
      .then(responseBody => {
        log('BPMN content fetched');
        statusFetched(container, url, round(performance.now() - startTime));
        return responseBody;
      })
      .catch(error => {
        statusFetchKO(container, url, round(performance.now() - startTime), error);
        throw new Error(`Unable to fetch ${url}. ${error}`);
      });
}

function loadBpmnFromUrl(container, bpmnVisualization, url) {
  fetchBpmnContent(container, url)
      .then(bpmn => {
        const startTime = performance.now();
        try {
          log('Start loading Bpmn');
          bpmnVisualization.load(bpmn);
          log('Bpmn loaded from url <%s>', url);
          statusLoadOK(container, round(performance.now() - startTime));
        } catch (error) {
          statusLoadKO(container, round(performance.now() - startTime), error);
          throw new Error(`Unable to load ${url}. ${error}`);
        }
      })
  ;
}

function loadMiwgFile(container, bpmnVisualization, fileName) {
  const file = fileName.startsWith('image-') ? `${fileName.substring('image-'.length)}.png` : `${fileName}.bpmn`;
  log('Ready to fetch MIWG file %s', file);
  const url = `https://raw.githubusercontent.com/bpmn-miwg/bpmn-miwg-test-suite/master/Reference/${file}`;
  loadBpmnFromUrl(container, bpmnVisualization, url);
}

const miwgFileNames = [
  'A.1.0',
  'A.2.0', 'A.2.1',
  'A.3.0',
  'A.4.0', 'A.4.1',
  'B.1.0', 'B.2.0',
  'C.1.0', 'C.1.1', 'C.2.0', 'C.3.0', 'C.4.0',
  'C.5.0', 'C.6.0', 'C.7.0', 'C.8.0', 'C.8.1',
  // extra file to get fetch error
  'do-not-exist',
  // extra file to get load error
  'image-A.1.0'
];

function createElementsInDOM() {
  const container = document.createElement('div');
  container.innerHTML = `
<section class="container col-10 flex-centered mt-2">
        <section class="col-12 mt-2 relative">
            <h2>Load remote BPMN diagrams</h2>
            <button id="btn-fetch-miwg" title="Fetch from miwg-test-suite" class="btn btn-primary has-icon-right">
                <span>Fetch random file </span><span class="icon icon-refresh mb-1"></span>
            </button>
            from <a href="https://github.com/bpmn-miwg/bpmn-miwg-test-suite" target="_blank" rel="noopener noreferrer">miwg-test-suite</a>
            or select a specific
            <div class="dropdown dropdown-right mr-2">
                <a id="dropdown-toggle-fetch-miwg" href="#" class="btn btn-primary dropdown-toggle" tabindex="0">
                    file <span class="icon icon-caret icon-in-the-middle"></span>
                </a>
                <ul class="menu" id="dropdown-fetch-miwg">
                </ul>
            </div>
            <div id="fetch-status"></div>
            <div id="load-status"></div>
        </section>
</section>
<section class="col-12 mt-2 relative">
    <div class="bpmn-container-absolute">
        <div id="bpmn-container" class="mb-2"></div>
    </div>
</section>`;

  return container;
}

export const createLoadRemoteBpmnDiagram = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new  BpmnVisualization({
    container: container.querySelector('#bpmn-container'),
    renderer: {
      // use the colors defined in the miwg-test-suite diagrams when rendering
      ignoreBpmnColors: false,
    },
  });

  container.querySelector('#btn-fetch-miwg').onclick = function() {
    const fileName = miwgFileNames[Math.floor(Math.random() * miwgFileNames.length)];
    loadMiwgFile(container, bpmnVisualization, fileName);
  };

  // Drop down list
  container.querySelector('#dropdown-fetch-miwg').innerHTML = miwgFileNames.map(fileName => {
    return `<li><a href="#" class="btn btn-link">${fileName}</a></li>`
  }).join('\n');

  container.querySelectorAll('#dropdown-fetch-miwg li a')
      .forEach(function (anchor)  {
        anchor.onclick = function (e) {
          e.preventDefault();
          // get li value
          const miwgFileName = anchor.parentElement.innerText;
          loadMiwgFile(container, bpmnVisualization, miwgFileName);

          container.querySelector('#dropdown-fetch-miwg').classList.add('hidden');

          return false;
        };
      });

  container.querySelector('#dropdown-toggle-fetch-miwg').onclick = function (){
    container.querySelector('#dropdown-fetch-miwg').classList.remove('hidden');
  }

  return container;
};
