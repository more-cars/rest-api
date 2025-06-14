import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

// Opposite to the counterpart test on the database layer, here we expect an error, not an empty result.
// On the application layer the models perform semantical checks, on the database only syntactical ones.
// If the car model does not exist it should be detected and return an error.
test('An error should be returned when the CAR MODEL does not exist', async () => {
    await expect(CarModel.getRelationshipForBelongsToBrand(-42))
        .rejects
        .toThrow(Error)
})
