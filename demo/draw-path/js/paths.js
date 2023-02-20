class Path {
    _sourceId ;
    _edgeId;
    _targetId;

    constructor(sourceId, edgeId, targetId) {
        this._sourceId = sourceId;
        this._edgeId = edgeId;
        this._targetId = targetId;
    }

    get sourceId() {
        return this._sourceId;
    }

    get edgeId() {
        return this._edgeId;
    }

    get targetId() {
        return this._targetId;
    }
}

const paths = [
    new Path('start_event', "sequence_flow_1", "parallel_gateway_1"),
    new Path('parallel_gateway_1', "sequence_flow_2", "task_1"),
    new Path('parallel_gateway_1', "sequence_flow_18", "task_2"),
    new Path('task_1', "sequence_flow_3", "exclusive_gateway_1"),
    new Path('task_2', "sequence_flow_15", "parallel_gateway_2"),
    new Path('exclusive_gateway_1', "sequence_flow_4", "task_3"),
    new Path('exclusive_gateway_1', "sequence_flow_5", "task_5"),
    new Path('exclusive_gateway_2', "sequence_flow_14", "parallel_gateway_2"),
    new Path('parallel_gateway_2', "sequence_flow_16", "task_8"),
    new Path('task_8', "sequence_flow_17", "end_event"),
    new Path('task_3', "sequence_flow_12", "task_4"),
    new Path('task_4', "sequence_flow_13", "exclusive_gateway_2"),
    new Path('task_5', "sequence_flow_6", "inclusive_gateway_1"),
    new Path('inclusive_gateway_1', "sequence_flow_7", "task_7"),
    new Path('inclusive_gateway_1', "sequence_flow_8", "task_6"),
    new Path('inclusive_gateway_2', "sequence_flow_11", "exclusive_gateway_2"),
    new Path('task_7', "sequence_flow_10", "inclusive_gateway_2"),
    new Path('task_6', "sequence_flow_9", "inclusive_gateway_2")
];
