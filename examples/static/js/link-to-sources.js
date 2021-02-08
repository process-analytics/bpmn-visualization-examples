// we want to transform
// https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/173d6e7db380f74e61c98c43460d1642852e9d37/examples/custom-navigation/call-activity-with-modal-on-mouse-over/index.html
// into
// https://github.com/process-analytics/bpmn-visualization-examples/tree/173d6e7db380f74e61c98c43460d1642852e9d37/examples/custom-navigation/call-activity-with-modal-on-mouse-over
if (window.location.hostname === 'cdn.statically.io') {
    // get the part after the 4th slash
    const part = window.location.pathname.split('/').slice(4).join('/');
    // and remove the file part
    const indexLastSlash = part.lastIndexOf('/');
    const finalPath = part.substring(0, indexLastSlash);
    const githubHref = `https://github.com/process-analytics/bpmn-visualization-examples/tree/${finalPath}`;

    const titleWithGhLinkElt = document.querySelector('section h2');
    titleWithGhLinkElt.innerHTML = `${titleWithGhLinkElt.innerHTML} <a href="${githubHref}" title="View the source code on GitHub" style="text-decoration: none"><img src="https://github.githubassets.com/favicons/favicon.png" alt="github logo"></a>`;
    console.info('Title updated with link to GH sources!');
}
