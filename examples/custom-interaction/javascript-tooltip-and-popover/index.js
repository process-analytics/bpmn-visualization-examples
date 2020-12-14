const bpmnContainerElt = window.document.getElementById('bpmn-container');
// TODO enable navigation support
// There is currently an issue with popover which are wrongly updated during and after panning
const bpmnVisualization = new bpmnvisu.BpmnVisualization(bpmnContainerElt, { mouseNavigationSupport: false });

const diagram = getHorizontalBpmnDiagram();
bpmnVisualization.load(diagram, { fit: {type: 'Center', margin: 10 } });


const htmlElementRegistry = bpmnVisualization.htmlElementRegistry;
const userTask2Elt = htmlElementRegistry.getBpmnHtmlElement('Activity_0kn4d46');
const manualTask3Elt = htmlElementRegistry.getBpmnHtmlElement('Activity_1j15wcw');
const scriptTask5Elt = htmlElementRegistry.getBpmnHtmlElement('Activity_0y3sd80');
const sequenceFlowBetweenTask5AndEndEventElt = htmlElementRegistry.getBpmnHtmlElement('Flow_12yysoe');


// tippy global configuration
tippy.setDefaultProps({
    content: 'Loading...',
    allowHTML: true,
    onShow(instance) {
        instance.setContent(getBpmnElementInfoAsHtml(instance.reference));
    },
    onHidden(instance) {
        instance.setContent('Loading...');
    },

    // don't consider `data-tippy-*` attributes on the reference element as we fully manage tippy with javascript
    // and we cannot update the reference here as it is generated by bpmn-visualization
    ignoreAttributes: true,

    // https://atomiks.github.io/tippyjs/v6/all-props/#popperoptions
    // modifiers: [
    //     {
    //         name: 'computeStyles',
    //         options: {
    //             adaptive: false, // true by default
    //         },
    //     },
    // ],
    // popperOptions: {
    //     strategy: 'fixed',
    // },


    // https://atomiks.github.io/tippyjs/v6/all-props/#placement

    // https://atomiks.github.io/tippyjs/v6/all-props/#inlinepositioning
    // inlinePositioning: true,

    // https://atomiks.github.io/tippyjs/v6/all-props/#interactive
    interactive: true,

    // https://atomiks.github.io/tippyjs/v6/all-props/#movetransition
    // custom transition --> not needed
    // moveTransition: 'transform 0.2s ease-out',
});

// popover on shapes
addPopover([manualTask3Elt, scriptTask5Elt]);

// popup on edges
addPopup([sequenceFlowBetweenTask5AndEndEventElt], true);
// popup on shapes
addPopup([userTask2Elt]);


function addPopover(elements) {
    // Set the cursor to mark the elements as clickable
    // TODO don't work with diagram navigation, use new API when available (see https://github.com/process-analytics/bpmn-visualization-js/issues/942)
    elements.forEach(elt => elt.classList.add('c-hand'));

    tippy(elements, {
        // sticky option behaviour with this appendTo
        // The following is only needed to manage diagram navigation
        // Current issue while panning, the dimension of the popper changed while dragging which may also wrongly trigger a flip
        // during the pan and then, an new flip after dimensions are restored
        // for issue on panning, this may help: https://github.com/atomiks/tippyjs/issues/688

        // Notice that we cannot have the same configuration when we trigger on mouseover/focus or on click

        // When trigger on click
        // 'reference': work with zoom (do not move the popper), but disappear on pan, mainly vertical pan (translation computation issue)
        // 'popper': do not move on zoom, move on pan but also change the dimension of the tooltip while panning)
        appendTo: bpmnContainerElt,

        // When trigger on click
        // when using this, no resize issue on pan, but no more flip nor overflow. We can however use sticky: 'reference' with is better
        // It is almost ok when trigger on mouse over/focus as even if there is still an overflow issue, the tooltip disappear right
        // after the bpmn element is no more displayed after overflow
        //appendTo: bpmnContainerElt.parentElement,


        // https://atomiks.github.io/tippyjs/v6/all-props/#sticky
        // This has a performance cost since checks are run on every animation frame. Use this only when necessary!
        // enable it
        //sticky: true,
        // only check the "reference" rect for changes
        sticky: 'reference',
        // only check the "popper" rect for changes
        // sticky: 'popper',


        duration: 400,
        delay: [200, 400],
        theme: 'light-border',

        trigger: 'click',
    });
}


function addPopup(elements, isEdge) {
    const offset = isEdge? [0, -40] : undefined;

    tippy(elements, {
        // sticky option behaviour with this appendTo
        // The following is only needed to manage diagram navigation
        // Current issue while panning, the dimension of the popper changed while dragging which may also wrongly trigger a flip
        // during the pan and then, an new flip after dimensions are restored
        // for issue on panning, this may help: https://github.com/atomiks/tippyjs/issues/688

        // Notice that we cannot have the same configuration when we trigger on mouseover/focus or on click

        // When trigger on click
        // 'reference': work with zoom (do not move the popper), but disappear on pan, mainly vertical pan (translation computation issue)
        // 'popper': do not move on zoom, move on pan but also change the dimension of the tooltip while panning)
        // appendTo: bpmnContainerElt,

        // When trigger on click
        // when using this, no resize issue on pan, but no more flip nor overflow. We can however use sticky: 'reference' with is better
        appendTo: bpmnContainerElt.parentElement,


        // https://atomiks.github.io/tippyjs/v6/all-props/#sticky
        // This has a performance cost since checks are run on every animation frame. Use this only when necessary!
        // enable it
        //sticky: true,
        // only check the "reference" rect for changes
        sticky: 'reference',
        // only check the "popper" rect for changes
        // sticky: 'popper',

        arrow: false,
        offset: offset,
        placement: 'bottom',
    });
}



function getBpmnElementInfoAsHtml(htmlElement) {
    // TODO hack, will be correctly managed with https://github.com/process-analytics/bpmn-visualization-js/issues/929
    const bpmnId = htmlElement.getAttribute('data-bpmn-id');
    const bpmnKind = htmlElement.getAttribute('class'); // TODO not working on clickable element (additional class for cursor)
    return `<div class="bpmn-popover">
BPMN Element
<hr>
<b>bpmn id</b>: ${bpmnId}<br>
<b>bpmn name</b>: N/A<br>
<b>bpmn kind</b>: ${bpmnKind}
</div>`;
}
