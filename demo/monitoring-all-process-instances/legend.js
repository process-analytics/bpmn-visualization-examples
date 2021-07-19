function createChartElement(chartId) {
    let chartElement = document.createElement("chart");
    chartElement.id = chartId;
    chartElement.setAttribute('scale-y-linear', "0 250");
    document.getElementById("legend").appendChild(chartElement);
    return chartElement;
}

function createGuideYElement(chartElement) {
    let guideYElement = document.createElement("guide-y");
    guideYElement.setAttribute('ticks', "0 50 100 150 200 250");
    chartElement.appendChild(guideYElement);
    return guideYElement;
}

function createBarElement(chartElement, literalLength, backgroundColor, width) {
    let barElement = document.createElement("bar");
    barElement.setAttribute('literal-length', literalLength);
    barElement.style.backgroundColor = backgroundColor;

    if(width) {
        barElement.style.width = width;
    }

    chartElement.appendChild(barElement);
}