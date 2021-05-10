function getShapeTimeData() {
    const map = new Map();
    map.set('start_event', '15 s');
    map.set('parallel_gateway_1', '15 s');
    map.set('task_1', getTime('minute'));
    map.set('task_2', getTime('minute'));
    map.set('exclusive_gateway_1', getTime('minute'));
    map.set('task_3', getTime('minute'));
    map.set('task_4', getTime('day'));
    map.set('task_5', getTime('hour'));
    map.set('inclusive_gateway_1', getTime('second'));
    map.set('task_6', getTime('hour'));
    map.set('task_7', getTime('month'));
    map.set('inclusive_gateway_2', getTime('day'));
    map.set('exclusive_gateway_2', getTime('day'));
    map.set('parallel_gateway_2', getTime('day'));
    map.set('task_8', getTime('hour'));
    map.set('end_event', '15 s');
    return map;
}

function getEdgeTimeData() {
    const map = new Map();
    map.set('sequence_flow_1', '15 s');
    map.set('sequence_flow_2', '15 s');
    map.set('sequence_flow_18', '15 s');
    map.set('sequence_flow_3', getTime('second'));
    map.set('sequence_flow_4', getTime('second'));
    map.set('sequence_flow_12', getTime('second'));
    map.set('sequence_flow_13', getTime('second'));
    map.set('sequence_flow_5', getTime('second'));
    map.set('sequence_flow_6', getTime('second'));
    map.set('sequence_flow_8', getTime('second'));
    map.set('sequence_flow_7', getTime('second'));
    map.set('sequence_flow_10', getTime('second'));
    map.set('sequence_flow_9', getTime('second'));
    map.set('sequence_flow_11', getTime('second'));
    map.set('sequence_flow_14', getTime('second'));
    map.set('sequence_flow_15', getTime('second'));
    map.set('sequence_flow_16', getTime('second'));
    map.set('sequence_flow_17', '15 s');
    return map;
}

function getTime(unit){
    const date = new Date();
    date.setTime(Math.random()*100000000000000);
    switch (unit) {
        case 'month':
            return date.getMonth() === 0 ? getTime('day') : `${date.getMonth()} month`;
        case 'day':
            return date.getDay() === 0 ? getTime('hour') :`${date.getDay()} d`;
        case 'hour':
            return date.getHours() === 0 ? getTime('minute') :`${date.getHours()} h`;
        case 'minute':
            return date.getMinutes() === 0 ? getTime('second') :`${date.getMinutes()} min`;
        case 'second':
        default:
            return `${date.getSeconds()} s`;
    }
}

function getFrequencyData() {
    const random = Math.floor(Math.random()*1000);

    const shapeMap = new Map();
    const edgeMap = new Map();
    shapeMap.set('start_event', String(random));
    edgeMap.set('sequence_flow_1', String(random));
    shapeMap.set('parallel_gateway_1', String(random));
    edgeMap.set('sequence_flow_2', String(random));
    shapeMap.set('task_1', String(random));
    edgeMap.set('sequence_flow_18', String(random));
    shapeMap.set('task_2', String(random));
    edgeMap.set('sequence_flow_3', String(random));
    shapeMap.set('exclusive_gateway_1', String(random));

    let fivePerCent = random*5/100;
    edgeMap.set('sequence_flow_4', String(fivePerCent));
    shapeMap.set('task_3', String(fivePerCent));
    edgeMap.set('sequence_flow_12', String(fivePerCent));
    shapeMap.set('task_4', String(fivePerCent));
    edgeMap.set('sequence_flow_13', String(fivePerCent));

    let ninetyFivePerCent = random-fivePerCent;
    edgeMap.set('sequence_flow_5', String(ninetyFivePerCent));
    shapeMap.set('task_5', String(ninetyFivePerCent));
    edgeMap.set('sequence_flow_6', String(ninetyFivePerCent));
    shapeMap.set('inclusive_gateway_1', String(ninetyFivePerCent));

    let thirtyPerCent = ninetyFivePerCent*30/100;
    edgeMap.set('sequence_flow_7', String(thirtyPerCent));
    shapeMap.set('task_7', String(thirtyPerCent));
    edgeMap.set('sequence_flow_10', String(thirtyPerCent));

    let otherPerCent = ninetyFivePerCent-thirtyPerCent;
    edgeMap.set('sequence_flow_8', String(otherPerCent));
    shapeMap.set('task_6', String(otherPerCent));
    edgeMap.set('sequence_flow_9', String(otherPerCent));

    shapeMap.set('inclusive_gateway_2', String(ninetyFivePerCent));
    edgeMap.set('sequence_flow_11', String(ninetyFivePerCent));

    shapeMap.set('exclusive_gateway_2', String(random));
    edgeMap.set('sequence_flow_14', String(random));
    edgeMap.set('sequence_flow_15', String(random));
    shapeMap.set('parallel_gateway_2', String(random));
    edgeMap.set('sequence_flow_16', String(random));
    shapeMap.set('task_8', String(random));
    edgeMap.set('sequence_flow_17', String(random));
    shapeMap.set('end_event', String(random));

    return {shape: shapeMap, edge: edgeMap};
}


