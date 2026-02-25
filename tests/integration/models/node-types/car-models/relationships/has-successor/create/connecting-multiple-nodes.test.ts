import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL cannot have multiple ›has-successor‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const partnerNodesAmount = 3
    const partnerNodes = await seedNodes(DbNodeType.CarModel, partnerNodesAmount)

    for (const partnerNode of partnerNodes) {
        await CarModel.createHasSuccessorRelationship(carModel.properties.id, partnerNode.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.properties.id,
        RelationshipType.CarModelHasSuccessor,
        DbNodeType.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
