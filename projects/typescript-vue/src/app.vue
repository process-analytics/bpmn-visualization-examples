<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { BpmnElement, BpmnElementsRegistry, BpmnVisualization, FitType, OverlayPosition, ShapeBpmnElementKind } from 'bpmn-visualization';

let vis: BpmnVisualization;
let registry: BpmnElementsRegistry;
const allFlowNodes = ref<BpmnElement[]>([]);
const selectedElement = ref<string>();
const dropdownActive = ref(false);
const loading = ref(true);
const loadError = ref();

const nodeDropdown = ref<string>();
const overlayText = ref<string>('');
const overlayPosition = ref<OverlayPosition>('top-left');


onMounted(async () => {
    const res = await fetch('/pizza-collaboration.bpmn');
    const pizzaDiagram = await res.text();
    vis = new BpmnVisualization({
        container: "bpmn-container",
        navigation: {
            enabled: true,
        },
        renderer: {
            ignoreBpmnColors: false,
        }
    });
    // load the BPMN diagram defined above
    vis.load(pizzaDiagram, {
        fit: { type: FitType.Center, margin: 30 },
    });
    registry = vis.bpmnElementsRegistry;


    allFlowNodes.value = getAllFlowNodes();
    setupEventHandlers();
    loading.value = false;
})
function getAllFlowNodes() {
    return registry.getElementsByKinds(
        Object.values(ShapeBpmnElementKind).filter(kind =>
            kind !== ShapeBpmnElementKind.LANE &&
            kind !== ShapeBpmnElementKind.POOL &&
            kind !== ShapeBpmnElementKind.CALL_ACTIVITY &&
            kind !== ShapeBpmnElementKind.SUB_PROCESS &&
            kind !== ShapeBpmnElementKind.GROUP &&
            kind !== ShapeBpmnElementKind.TEXT_ANNOTATION)
    );
}
function setupEventHandlers() {
    allFlowNodes.value.forEach(item => {
        const currentId = item.bpmnSemantic.id;
        item.htmlElement.onclick = () => {
            setSelectedElement(currentId);
        };
        item.htmlElement.onmouseenter = (ev) => {
            if (ev.buttons == 1) {
                return;
            }
            registry.addCssClasses(currentId, 'highlightNode');
        };
        item.htmlElement.onmouseleave = () => {
            registry.removeCssClasses(currentId, 'highlightNode');
        };
    });
}
function setSelectedElement(value?: string) {
    if (!value) {
        return;
    }
    if (selectedElement.value) {
        registry.removeCssClasses(selectedElement.value, 'selectedNode')
    }
    registry.addCssClasses(value, 'selectedNode')
    selectedElement.value = value;
    nodeDropdown.value = value;
}
function addOverlay() {
    if (selectedElement.value && overlayPosition.value) {
        registry.addOverlays(selectedElement.value, { position: overlayPosition.value, label: overlayText.value })
    }
}
function removeAllOverlays() {
    if (selectedElement.value) {
        registry.removeAllOverlays(selectedElement.value)
    }
}
function changeDiagramm(event: Event): void {
    loading.value = true;
    loadError.value = undefined;
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
        loading.value = false;
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        try {
            vis.load(reader.result?.toString() ?? '', {
                fit: { type: FitType.Center, margin: 30 }
            });
            allFlowNodes.value = getAllFlowNodes()
            setupEventHandlers();
        } catch (error: unknown) {
            loadError.value = error;
            console.error(error);
        }
        loading.value = false;
    };
    reader.readAsText(file);
}
</script>

<template>
    <header>
        <section>
            <img style="max-height: 40px;" alt="" src="../logo_64x64_white.png" />
            <span class="title">bpmn-visualization + Vue</span>
        </section>
        <section>
            <div>
                <input type="file" id="btn-open-file" @change="changeDiagramm" name="btn-open-file" class="hidden" />
                <label for="btn-open-file" class="btn btn-primary has-icon-right"><span>Choose a local file </span><span
                        class="icon icon-upload"></span></label>
            </div>
            <div class="dropdown mr-2" :class="{ active: dropdownActive }">
                <a href="#" class="btn" @click="dropdownActive = !dropdownActive" tabindex="0">
                    Edit Nodes <i class="icon icon-caret"></i>
                </a>
                <!-- menu component -->
                <ul class="menu" style="color: #2c3e50; width: 400px;">
                    <div class="form-group">
                        <label class="form-label label-sm">Node</label>
                        <select class="form-select select-sm" v-model="nodeDropdown"
                            @change="setSelectedElement(nodeDropdown)">
                            <option v-for="opt in allFlowNodes" :value="opt.bpmnSemantic.id">{{ opt.bpmnSemantic.name ||
                                opt.bpmnSemantic.id }} ({{ opt.bpmnSemantic.kind }})</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label label-sm">Overlays</label>
                        <div style="display: flex; gap: 10px;">
                            <input class="form-input input-sm" v-model="overlayText" />
                            <select class="form-select select-sm" v-model="overlayPosition"
                                @change="setSelectedElement(nodeDropdown)">
                                <option
                                    v-for="pos in ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center', 'middle-left', 'middle-right']"
                                    :value="pos">{{ pos }}</option>
                            </select>
                            <button class="btn btn-sm" @click="addOverlay">Add Overlay</button>
                        </div>
                        <div style="display: flex; place-content: end; align-items: center; height: 40px; ">
                            <button class="btn btn-error btn-sm" style="float: right;" @click="removeAllOverlays">Remove all
                                Overlays</button>
                        </div>
                    </div>
                </ul>
            </div>
        </section>
        <section style="flex-grow: 0">
            <div class="dropdown">
                <a href="#" class="btn dropdown-toggle" tabindex="0">
                    Docs <span class="icon icon-caret icon-in-the-middle"></span>
                </a>
                <ul class="menu">
                    <li><a href="https://process-analytics.github.io/bpmn-visualization-js/"
                            class="mr-2 btn btn-link">Docs</a></li>
                    <li><a href="https://process-analytics.github.io/bpmn-visualization-js/api/index.html"
                            class="mr-2 btn btn-link">Api</a></li>
                </ul>
            </div>
            <div class="dropdown mr-2 dropdown-right">
                <a href="#" class="btn btn-primary dropdown-toggle" tabindex="0">
                    GitHub <span class="icon icon-caret icon-in-the-middle"></span>
                </a>
                <ul class="menu">
                    <li><a href="https://github.com/process-analytics/bpmn-visualization-js"
                            class="mr-2 btn btn-link">Library</a></li>
                    <li><a href="https://github.com/process-analytics/bpmn-visualization-examples"
                            class="mr-2 btn btn-link">Examples</a></li>
                </ul>
            </div>
        </section>
    </header>
    <div id="bpmn-container"></div>
    <div class="zoomBox">
        <button style="border-radius: 20px 0 0 20px; float: left;" class="sideButton" @click="vis.graph.zoomOut()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>
        <button class="mainButton" @click="vis.navigation.fit({ type: FitType.Center, margin: 30 })">
            <span class="fit">Fit</span>
        </button>
        <button class="sideButton" style="border-radius: 0 20px 20px 0; float: right" @click="vis.graph.zoomIn()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
        </button>
    </div>
    <div v-if="loading" class="loading loading-lg"
        style="position: absolute; width: 100%; height: calc(100% - 58px); top: 58px; background: white;"></div>
    <div v-if="loadError" class="errorDisplay">
        <h1 class="h1 text-error">!</h1>
        <span>{{loadError?.toString()}}</span>
    </div>
    <footer></footer>
</template>