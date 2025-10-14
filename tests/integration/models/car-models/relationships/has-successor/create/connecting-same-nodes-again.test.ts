import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-successor‹ relationship again', async () => {
    const carModel = await seedCarModel()
    const partnerNode = await seedCarModel()

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
