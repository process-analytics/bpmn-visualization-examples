const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });

function log(message, ...optionalParams) {
  console.info('[DEMO] ' + message, ...optionalParams);
}
function loadBpmn(bpmn){
  bpmnVisualization.load(bpmn);
}

// at least on chromium, performance.now() returns a lot of digits. We don't care to have such a precision here, so round to only keep milliseconds
function round(duration) {
  return duration.toFixed(0)
}

const fetchStatusElt = document.getElementById('fetch-status');
function statusFetching(url) {
  fetchStatusElt.innerText = 'Fetching ' + url;
  fetchStatusElt.className = 'status-fetching';
  loadStatusElt.className = 'hidden';
}

function statusFetched(url, duration) {
  fetchStatusElt.innerText = `Fetch OK (${duration} ms): ${url}`;
  fetchStatusElt.className = 'toast toast-success';
}

function statusFetchKO(url, error) {
  fetchStatusElt.innerText = `Unable to fetch ${url}. ${error}`;
  fetchStatusElt.className = 'toast toast-error';
}

const loadStatusElt = document.getElementById('load-status');
function statusLoadOK(duration) {
  loadStatusElt.innerText = `BPMN Load OK (${duration} ms)`;
  loadStatusElt.className = 'toast toast-primary';
}

function statusLoadKO(duration, error) {
  loadStatusElt.innerText = `BPMN Load KO (${duration} ms). ${error}`;
  loadStatusElt.className = 'toast toast-error';
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
    statusFetched(url, round(performance.now() - startTime));
    return responseBody;
  })
  .catch(error => {
    statusFetchKO(url, error);
    throw new Error(`Unable to fetch ${url}. ${error}`);
  });
}

function loadBpmnFromUrl(url) {
  fetchBpmnContent(url)
      .then(bpmn => {
        const startTime = performance.now();
        try {
          log('Start loading Bpmn');
          loadBpmn(bpmn);
          log('Bpmn loaded from url <%s>', url);
          statusLoadOK(round(performance.now() - startTime));
        } catch (error) {
          statusLoadKO(round(performance.now() - startTime), error);
          throw new Error(`Unable to load ${url}. ${error}`);
        }
      })
  ;
}

function loadMiwgFile(fileName) {
  const file = fileName.startsWith('image-') ? `${fileName.substring('image-'.length)}.png` : `${fileName}.bpmn`;
  log('Ready to fetch MIWG file %s', file);
  const url = `https://raw.githubusercontent.com/bpmn-miwg/bpmn-miwg-test-suite/master/Reference/${file}`;
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
  // extra file to get fetch error
  'do-not-exist',
  // extra file to get load error
  'image-A.1.0'
];
document.getElementById('btn-fetch-miwg').onclick = function() {
  const fileName = miwgFileNames[Math.floor(Math.random() * miwgFileNames.length)];
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
