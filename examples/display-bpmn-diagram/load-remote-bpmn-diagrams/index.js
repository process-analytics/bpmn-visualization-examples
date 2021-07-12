const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });

function log(message, ...optionalParams) {
  console.info('[DEMO] ' + message, ...optionalParams);
}
function loadBpmn(bpmn){
  bpmnVisualization.load(bpmn);
}

function statusFetching(url) {
  const statusElt = document.getElementById('fetch-status');
  statusElt.innerText = 'Fetching ' + url;
  statusElt.className = 'status-fetching';
}

function statusFetched(url, duration) {
  const statusElt = document.getElementById('fetch-status');
  statusElt.innerText = `Fetch OK (${duration} ms): ${url}`;
  statusElt.className = 'toast toast-success';
}

function statusFetchKO(url, error) {
  const statusElt = document.getElementById('fetch-status');
  statusElt.innerText = `Unable to fetch ${url}. ${error}`;
  statusElt.className = 'toast toast-error';
}

function fetchBpmnContent(url) {
  log('Fetching BPMN content from url <%s>', url);
  const startTime = performance.now();
  statusFetching(url);
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw Error(String(response.status));
    }
    return response.text();
  })
  .then(responseBody => {
    log('BPMN content fetched');
    const duration = performance.now() - startTime;
    statusFetched(url, duration);
    return responseBody;
  })
  .catch(error => {
    statusFetchKO(url, error);
    throw new Error(`Unable to fetch ${url}. ${error}`);
  });
}

function loadBpmnFromUrl(url) {
  fetchBpmnContent(url).then(bpmn => {
    loadBpmn(bpmn);
    log('Bpmn loaded from url <%s>', url);
  });
}

function loadMiwgFile(fileName) {
  log('Ready to fetch MIWG file %s', fileName);
  const url = `https://raw.githubusercontent.com/bpmn-miwg/bpmn-miwg-test-suite/master/Reference/${fileName}.bpmn`;
  loadBpmnFromUrl(url);
}

const miwgFileNames = [
  'A.1.0',
  'A.2.0', 'A.2.1',
  'A.3.0',
  'A.4.0', 'A.4.1',
  'B.1.0', 'B.2.0',
  'C.1.0', 'C.1.1', 'C.2.0', 'C.3.0', 'C.4.0',
  'C.5.0', 'C.6.0', 'C.7.0',
];

const randomMiwgFileNames = [...miwgFileNames, 'do-not-exist'];
document.getElementById('btn-fetch-miwg').onclick = function() {
  const fileName = randomMiwgFileNames[Math.floor(Math.random() * randomMiwgFileNames.length)];
  loadMiwgFile(fileName);
};

// Drop down list
document.querySelector('#dropdown-fetch-miwg').innerHTML = miwgFileNames.map(fileName => {
  return `<li><a href="#" class="btn btn-link">${fileName}</a></li>`
}).join('\n');

document.querySelectorAll('#dropdown-fetch-miwg li a')
.forEach(function (anchor)  {
  anchor.onclick = function (e) {
    e.preventDefault();
    // get li value
    const miwgFileName = anchor.parentElement.innerText;
    loadMiwgFile(miwgFileName);

    document.getElementById('dropdown-fetch-miwg').classList.add('hidden');

    return false;
  };
});

document.getElementById('dropdown-toggle-fetch-miwg').onclick = function (){
  document.getElementById('dropdown-fetch-miwg').classList.remove('hidden');
}
