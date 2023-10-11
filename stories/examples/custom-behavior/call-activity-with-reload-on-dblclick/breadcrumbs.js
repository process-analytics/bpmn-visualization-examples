// Remove section of secondary diagram in Breadcrumbs
function removeSectionInBreadcrumbs() {
    let breadcrumbElt = document.getElementsByClassName("breadcrumb").item(0);
    breadcrumbElt.removeChild(document.getElementById('secondary-diagram'));
}

// Add section of secondary diagram in Breadcrumbs
function addSectionInBreadcrumbs() {
    let aElt = document.createElement('a');
    aElt.setAttribute('href', '#');
    aElt.appendChild(document.createTextNode('Procurement'));

    let liElt = document.createElement('liElt');
    liElt.setAttribute('id', 'secondary-diagram');
    liElt.setAttribute('class', 'breadcrumb-item');
    liElt.appendChild(aElt);

    let breadcrumbElt = document.getElementsByClassName("breadcrumb").item(0);
    breadcrumbElt.appendChild(liElt);
}