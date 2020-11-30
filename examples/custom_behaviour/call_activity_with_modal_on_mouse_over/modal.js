document.getElementById('close-modal').onclick = () => {
    modalElt.classList.remove('active');
};
document.getElementsByClassName('modal-overlay').item(0).onclick = () => {
    modalElt.classList.remove('active');
};
