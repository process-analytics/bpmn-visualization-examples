class PredictionUseCase extends UseCase {

    constructor(type) {
        super(type, () => pizzaDiagram(), true);
    }
}
