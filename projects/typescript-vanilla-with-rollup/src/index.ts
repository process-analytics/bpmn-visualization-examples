/**
 * Copyright 2022 Bonitasoft S.A.
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
import {BpmnVisualization} from "bpmn-visualization";
// this is simple example of the BPMN diagram, loaded as string. Load support provided by rollup-plugin-string.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from "./diagram.bpmn";

// instantiate the BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({
    container: "bpmn-container",
});
// load the BPMN diagram defined above
bpmnVisualization.load(diagram);

// display the bpmn-visualization version in the footer
const footer = document.querySelector<HTMLElement>("footer")!;
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString}`;
