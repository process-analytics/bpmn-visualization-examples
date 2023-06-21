class ExecutionData {

    _customerEvtBasedGwId = '_6-180';

    _vendorBakeThePizzaId = '_6-463';

    _vendorWhereIsMyPizzaId = '_6-674';

    _commonExecutedElements;

    _executedElements;

    _runningElementWithPrediction;

    _predictedPaths;

    #runningElementsWithoutPrediction = [this._vendorWhereIsMyPizzaId, this._customerEvtBasedGwId];

    _pathResolver;

    constructor(pathResolver) {
        this._pathResolver = pathResolver;
        this._commonExecutedElements = pathResolver.getVisitedEdges([
            // customer
            '_6-61', // start event
            '_6-74', // select a pizza
            '_6-127', // order a pizza

            // vendor
            '_6-450', // order received
            '_6-652', // parallel gateway
        ]);
    }

    get executedElements() {
        return this._executedElements;
    }

    get runningElementWithPrediction() {
        return this._runningElementWithPrediction;
    }

    get predictedPaths() {
        return this._predictedPaths;
    }

    get runningElementsWithoutPrediction() {
        return this.#runningElementsWithoutPrediction;
    }
}

class PredicatedLateDataExecutionManager extends DataExecutionManager {

    constructor(pathResolver) {
        super(pathResolver)

        this._executedElements = this._commonExecutedElements;
        this._runningElementWithPrediction = this._vendorBakeThePizzaId;
        this._predictedPaths = pathResolver.getVisitedEdges([
            // customer elements
            this._customerEvtBasedGwId,
            '_6-219', // timer event
            '_6-236', // 'Ask for the pizza'
            // vendor elements
            this._vendorWhereIsMyPizzaId,
            '_6-695', // 'Calm customer'
        ]);
    }
}

class PredictedOnTimeDataExecutionManager extends DataExecutionManager {

    constructor(pathResolver) {
        super(pathResolver)

        this._executedElements = pathResolver.getVisitedEdges([...this._commonExecutedElements, this._vendorBakeThePizzaId ]);
        this._runningElementWithPrediction = '_6-514'; // vendor 'Deliver the pizza'
        this._predictedPaths = pathResolver.getVisitedEdges([
            // customer elements
            this._customerEvtBasedGwId,
            '_6-202', // msg event 'Pizza received'
            '_6-304', // 'Pay the pizza'
            // vendor elements
            '_6-565', // 'Receive payment'
        ]);
    }

}
