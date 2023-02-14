class Steps {

    reset() {
        this._goToStep(1);
    }

    goToStep2(){
        this._goToStep(2);
    }

    goToStep3(){
        this._goToStep(3);
    }

    _goToStep(index) {
        const stepItems = document.getElementsByClassName("step-item");
        for (let stepItem of stepItems) {
            stepItem.classList.remove('active');
        }
        document.getElementById(`step${index}`).classList.add('active');
    }
}