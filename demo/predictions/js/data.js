class ExecutionData {

    _customerEvtBasedGwId = '_6-180';

    _vendorBakeThePizzaId = '_6-463';

    _vendorWhereIsMyPizzaId = '_6-674';

    #runningElementsWithoutPrediction = [this._vendorWhereIsMyPizzaId, this._customerEvtBasedGwId];

    _commonExecutedElements = [
        // customer
        '_6-61', // start event
        '_6-125', // sequence flow between 'start event' and 'select pizza'
        '_6-74', // select a pizza
        '_6-178', // sequence flow between 'select a pizza' and 'order a pizza'
        '_6-127', // order a pizza
        '_6-420', // sequence flow between 'order a pizza' and 'event-based gateway' (running element)

        '_6-638', // message flow

        // vendor
        '_6-450', // order received
        '_6-630', // sequence flow between 'order received' and 'parallel gateway'
        '_6-652', // parallel gateway
        '_6-693', // sequence flow between 'parallel gateway' and 'Bake the pizza'
        '_6-691', // sequence flow between 'parallel gateway' and 'where is my pizza'
    ];

    get executedElements() {
        return [];
    }

    get runningElementWithPrediction() {
        return null;
    }

    get predictedPaths() {
        return null;
    }

    get runningElementsWithoutPrediction() {
        return this.#runningElementsWithoutPrediction;
    }
}

class PredicatedLateExecutionData extends ExecutionData {

    _runningElementWithPrediction = {
        bpmnId: this._vendorBakeThePizzaId,
        cssClasses: 'state-predicted-late',
    };

    _predictedPaths = {
        ids: [
            // customer elements
            this._customerEvtBasedGwId,
            '_6-424', // sequence flow between 'event-based gateway' (running element) and timer event
            '_6-219', // timer event
            '_6-426', // sequence flow between 'timer event' and 'Ask for the pizza'
            '_6-236', // 'Ask for the pizza'
            // message flow
            '_6-642',
            // vendor elements
            this._vendorWhereIsMyPizzaId,
            '_6-748', // sequence flow between 'where is my pizza' and 'Calm customer'
            '_6-695', // 'Calm customer'
        ],
        cssClasses: 'path-predicted-late',
    };

    get executedElements() {
        return this._commonExecutedElements;
    }

    get runningElementWithPrediction() {
        return this._runningElementWithPrediction;
    }

    get predictedPaths() {
        return this._predictedPaths;
    }

}

class PredictedOnTimeExecutionData extends ExecutionData {

    _runningElementWithPrediction = {
        bpmnId: '_6-514', // vendor 'Deliver the pizza'
        cssClasses: 'state-predicted-on-time',
    };

    _predictedPaths = {
        ids: [
            // customer elements
            this._customerEvtBasedGwId,
            '_6-422', // sequence flow between 'event-based gateway' (running element) and msg event
            '_6-202', // msg event 'Pizza received'
            '_6-428', // sequence flow between 'msg event' and 'Pay the pizza'
            '_6-304', // 'Pay the pizza'
            // message flow
            '_6-640', // from vendor 'Deliver the pizza' to customer 'msg event'
            // vendor elements
            '_6-634', // sequence flow between 'Deliver the pizza' and 'Receive payment'
            '_6-565', // 'Receive payment'
        ],
        cssClasses: 'path-predicted-on-time'
    };

    _executedElements = [...this._commonExecutedElements,
        // vendor
        this._vendorBakeThePizzaId,
        '_6-632', // sequence flow between 'Bake the pizza' and 'Deliver the pizza'
    ];

    get executedElements() {
        return this._executedElements;
    }

    get runningElementWithPrediction() {
        return this._runningElementWithPrediction;
    }

    get predictedPaths() {
        return this._predictedPaths;
    }

}
