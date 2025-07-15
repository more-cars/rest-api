import {CarModel} from "../../../../../../../src/models/car-models/CarModel"

test('An error should be returned when the CAR MODEL does not exist', async () => {
    await expect(CarModel.getRelationshipsForHasImage(-42))
        .rejects
        .toThrow(Error)
})
