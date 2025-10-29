import {expect, test} from 'vitest'
import {seedCarModels} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›has-successor‹ relationships', async () => {
    const carModel = await seedCarModel()
    const partnerNodesAmount = 3
    const partnerNodes = await seedCarModels(partnerNodesAmount)

    for (const partnerNode of partnerNodes) {
        await CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id)
    }

    const relationships = await getRelationshipCollection(carModel.id, DbRelationship.CarModelHasSuccessor)

    expect(relationships.length)
        .toBe(1)
})
