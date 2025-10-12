import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('CAR MODEL exists, but has no ›belongs-to-brand‹ relationship', async () => {
    const carModel = await seedCarModel()

    await expect(CarModel.getBelongsToBrandRelationship(carModel.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
