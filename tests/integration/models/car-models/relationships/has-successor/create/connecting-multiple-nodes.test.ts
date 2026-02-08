import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A CAR MODEL cannot have multiple ›has-successor‹ relationships', async () => {
    const carModel = await seedCarModel()
    const partnerNodesAmount = 3
    const partnerNodes = await seedNodes(NodeTypeEnum.CAR_MODEL, partnerNodesAmount)

    for (const partnerNode of partnerNodes) {
        await CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id)
    }

    const relationships = await getRelationshipCollection(carModel.id, DbRelationship.CarModelHasSuccessor)

    expect(relationships.length)
        .toBe(1)
})
