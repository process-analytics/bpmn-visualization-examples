const logLinkToGithub = (msg) => {
    console.info('[Link to GH]', msg);
}

let subPath;
if (window.location.hostname === 'cdn.statically.io') {
    logLinkToGithub('Statically.io environment detected')
    // get the subPath after the 4th slash (everything after https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/)
    // for example, from https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/173d6e7db380f74e61c98c43460d1642852e9d37/examples/custom-navigation/call-activity-with-modal-on-mouse-over/index.html
    subPath = window.location.pathname.split('/').slice(4).join('/');
}
// local environment: webserver or file browsing
// <interesting_part> contains demo or examples in file://path/<interesting_part> or http://localhost:port/<interesting_part>
else if (window.location.hostname === 'localhost' || window.location.protocol.startsWith('file')) {
    logLinkToGithub('Local environment detected')
    const pathname = window.location.pathname;
    // we keep everything after the latest occurrence of /examples/, /demo/ or /tutorials/
    let lastIndexOfInterestingElement = pathname.lastIndexOf('/examples/');
    if (lastIndexOfInterestingElement === -1) {
        lastIndexOfInterestingElement = pathname.lastIndexOf('/demo/');
    }
    if (lastIndexOfInterestingElement === -1) {
        lastIndexOfInterestingElement = pathname.lastIndexOf('/tutorials/');
    }
    if (lastIndexOfInterestingElement !== -1) {
        // force link to master
        subPath = `master${pathname.substring(lastIndexOfInterestingElement)}`;
    }
}

if (subPath) {
    // remove the file at the end of the path subPath to create a link like
    // // https://github.com/process-analytics/bpmn-visualization-examples/tree/173d6e7db380f74e61c98c43460d1642852e9d37/examples/custom-navigation/call-activity-with-modal-on-mouse-over
    const indexLastSlash = subPath.lastIndexOf('/');
    const finalPath = subPath.substring(0, indexLastSlash);
    const githubHref = `https://github.com/process-analytics/bpmn-visualization-examples/tree/${finalPath}`;
    // the IDE the source of the current page
    const githubDevHref = `https://github.dev/process-analytics/bpmn-visualization-examples/tree/${subPath}`;

    const logoDimensionsDirective = 'width="32px" height="32px"';
    const anchorEltToGhSources = `<a href="${githubHref}" title="View the source code on GitHub" style="text-decoration: none"><img src="https://github.githubassets.com/favicons/favicon.png" alt="github logo" ${logoDimensionsDirective}></a>`;
    const anchorEltToGhDev = `<a href="${githubDevHref}" title="Edit the source code on GitHub DEV" style="text-decoration: none"><img src="https://github.com/LukyVj/dev-logos/raw/e1bde4a2e2acb31fb2bc61c8f34bd1fb5508e128/vs-code_logo.svg" alt="github codespaces logo" ${logoDimensionsDirective}></a>`;
    const titleWithGhLinkElements = document.querySelectorAll('section h2');
    titleWithGhLinkElements.forEach(titleWithGhLinkElt => {
        titleWithGhLinkElt.innerHTML = `${titleWithGhLinkElt.innerHTML} ${anchorEltToGhSources} ${anchorEltToGhDev}`
    });

    logLinkToGithub('Title(s) updated with link to GH sources and GH dev!');
}
