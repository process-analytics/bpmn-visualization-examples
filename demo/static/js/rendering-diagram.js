/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { documentReady, startBpmnVisualization, fit, FitType } from '../../index.es.js';

// to show mouse pointer position - usefull for testing
// @see https://github.com/puppeteer/puppeteer/issues/374
// @see https://github.com/puppeteer/puppeteer/blob/4fdb1e3cab34310b4a1012c3024a94bc422b3b92/test/assets/input/mouse-helper.js
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function showMousePointer() {
  const box = document.createElement('div');
  box.classList.add('mouse-helper');
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  .mouse-helper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.4);
    border: 1px solid white;
    border-radius: 10px;
    margin-left: -10px;
    margin-top: -10px;
    transition: background .2s, border-radius .2s, border-color .2s;
  }
  .mouse-helper.button-1 {
    transition: none;
    background: rgba(0,0,0,0.9);
  }
  .mouse-helper.button-2 {
    transition: none;
    border-color: rgba(0,0,255,0.9);
  }
  .mouse-helper.button-3 {
    transition: none;
    border-radius: 4px;
  }
  .mouse-helper.button-4 {
    transition: none;
    border-color: rgba(255,0,0,0.9);
  }
  .mouse-helper.button-5 {
    transition: none;
    border-color: rgba(0,255,0,0.9);
  }
  `;
  document.head.appendChild(styleElement);
  document.body.appendChild(box);
  document.addEventListener(
    'mousemove',
    event => {
      box.style.left = event.pageX + 'px';
      box.style.top = event.pageY + 'px';
      updateButtons(event.buttons);
    },
    true,
  );
  document.addEventListener(
    'mousedown',
    event => {
      updateButtons(event.buttons);
      box.classList.add('button-' + event.which);
    },
    true,
  );
  document.addEventListener(
    'mouseup',
    event => {
      updateButtons(event.buttons);
      box.classList.remove('button-' + event.which);
    },
    true,
  );
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function updateButtons(buttons) {
    for (let i = 0; i < 5; i++) box.classList.toggle('button-' + i, buttons & (1 << i));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureMousePointer(parameters) {
  if (parameters.get('showMousePointer') === 'true') {
    showMousePointer();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureControlsPanel(parameters) {
  const elControlsPanel = document.getElementById('controls-panel');
  if (parameters.get('showControlsPanel') === 'true') {
    elControlsPanel.classList.remove('hidden');
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function fitOnClick(fitType) {
  document.getElementById(fitType).onclick = () => fit({ type: fitType });
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureZoomThrottleInput(parameters) {
  const elZoomThrottle = document.getElementById('zoom-throttle');
  if (parameters.get('zoomThrottle')) {
    elZoomThrottle.value = parameters.get('zoomThrottle');
  }
  return elZoomThrottle;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureZoomDebounceInput(parameters) {
  const elZoomDebounce = document.getElementById('zoom-debounce');
  if (parameters.get('zoomDebounce')) {
    elZoomDebounce.value = parameters.get('zoomDebounce');
  }
  return elZoomDebounce;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function start() {
  const parameters = new URLSearchParams(window.location.search);
  configureMousePointer(parameters);
  configureControlsPanel(parameters);

  const elZoomThrottle = configureZoomThrottleInput(parameters);
  const elZoomDebounce = configureZoomDebounceInput(parameters);

  startBpmnVisualization({
    container: 'bpmn-container',
    globalOptions: {
      mouseNavigationSupport: true,
      zoomConfiguration: {
        throttleDelay: elZoomThrottle.value,
        debounceDelay: elZoomDebounce.value,
      },
    },
  });

  for (let fitTypeElement in FitType) {
    fitOnClick(fitTypeElement);
  }
}

documentReady(start);
