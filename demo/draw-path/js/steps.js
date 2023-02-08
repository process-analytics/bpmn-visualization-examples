class Steps {

    reset() {
        const stepItems = document.getElementsByClassName("step-item");
        for (let stepItem of stepItems) {
            stepItem.classList.remove('active');
        }
        document.getElementById('step1').classList.add('active');
    }

    goToStep2(){
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    }

    goToStep3(){
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
    }
}