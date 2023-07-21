/**
 * @param {string} duration format "2 days, 10 hours, 46 minutes"
 * @returns {number} in milliseconds
 */
const calculateTimeInMs = (duration) => {
    const byMinute = 1000 * 60;
    const byHour = byMinute * 60;
    const byDay = byHour * 24;

    const [days, hours, minutes] = duration.match(/\d+/g).map(Number);
    return (days || 0) * byDay + (hours || 0) * byHour + (minutes || 0) * byMinute;
};

/**
 * @param {number} duration
 * @returns {string} as "2 days, 10 hours, 46 minutes"
 */
const formatTimeToString = (duration) => {
    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    const hours = Math.floor((duration % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));

    return `${days} days, ${hours} hours, ${minutes} minutes`;
};

/**
 * @param {Date} date
 * @returns {string} as "YYYY-MM-DD HH:mm:ss"
 */
const formatDateToString = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

class ExecutionData {

    _customerEvtBasedGwId = '_6-180';

    _vendorBakeThePizzaId = '_6-463';

    _vendorWhereIsMyPizzaId = '_6-674';

    _commonExecutedElements;

    _executedElements;

    _nonPredictedElements;

    /**
     * format: {{id:string, startDate:string, predictedEnd:string, currentDelay: string, predictedDelay: string}}
     */
    _runningElementWithPrediction;

    _predictedPaths;

    _runningElementsWithoutPrediction = [this._vendorWhereIsMyPizzaId, this._customerEvtBasedGwId];

    _pathResolver;

    constructor(pathResolver) {
        this._pathResolver = pathResolver;

        this._commonExecutedElements = pathResolver.flatPathsWithNextEdges([
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

    get runningElementsWithoutPrediction() {
        return this._runningElementsWithoutPrediction;
    }

    get predictedPaths() {
        return this._predictedPaths;
    }

    get nonPredictedElements() {
        return this._nonPredictedElements;
    }
}

class PredicatedLateExecutionData extends ExecutionData {

    constructor(pathResolver) {
        super(pathResolver)

        this._executedElements = this._commonExecutedElements;

        const currentTime = new Date().getTime();
        const currentDelay = "2 days, 10 hours, 46 minutes";
        const delayInMs = calculateTimeInMs(currentDelay);
        const futurDelayInMs = calculateTimeInMs("5 days");

        let date = new Date(currentTime + futurDelayInMs);
        this._runningElementWithPrediction = {
            id: this._vendorBakeThePizzaId,
            startDate: formatDateToString(new Date(currentTime - 3 * 24 * 60 * 60 * 1000 - delayInMs)),
            predictedEnd: formatDateToString(date),
            currentDelay,
            predictedDelay: formatTimeToString(futurDelayInMs + delayInMs)
        };

        this._predictedPaths = pathResolver.flatPathsBetweenShapes([
            // customer elements
            this._customerEvtBasedGwId,
            '_6-219', // timer event
            '_6-236', // 'Ask for the pizza'
            // vendor elements
            this._vendorWhereIsMyPizzaId,
            '_6-695', // 'Calm customer'
        ]);

        const allCustomizedElements = [...this._executedElements, this._runningElementWithPrediction.id, ...this._predictedPaths];
        this._nonPredictedElements = pathResolver.flatAllPaths().filter(id=> !allCustomizedElements.includes(id));
    }
}

class PredictedOnTimeExecutionData extends ExecutionData {

    constructor(pathResolver) {
        super(pathResolver)

        this._executedElements = [...this._commonExecutedElements, ...pathResolver.flatPathsWithNextEdges([this._vendorBakeThePizzaId])];

        const currentDate = new Date();
        this._runningElementWithPrediction = {
            id: '_6-514', // vendor 'Deliver the pizza'
            startDate: formatDateToString(currentDate),
            predictedEnd: formatDateToString(new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000)),
            currentDelay: 'N/A',
            predictedDelay: 'N/A'
        };

        this._predictedPaths =  pathResolver.flatPathsBetweenShapes([
            // customer elements
            this._customerEvtBasedGwId,
            '_6-202', // msg event 'Pizza received'
            '_6-304', // 'Pay the pizza'
            // vendor elements
            '_6-565', // 'Receive payment'
        ]);

        const allCustomizedElements = [...this._executedElements, this._runningElementWithPrediction.id, ...this._predictedPaths];
        this._nonPredictedElements = pathResolver.flatAllPaths().filter(id=> !allCustomizedElements.includes(id));
    }

}
