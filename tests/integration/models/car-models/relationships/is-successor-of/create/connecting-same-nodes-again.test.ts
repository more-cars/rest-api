import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›is-successor-of‹ relationship again', async () => {
    const carModel = await seedCarModel()
    const partner = await seedCarModel()

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createIsSuccessorOfRelationship(carModel.id, partner.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
