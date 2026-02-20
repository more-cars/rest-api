import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL cannot have multiple ›has-successor‹ relationships', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const partnerNodesAmount = 3
    const partnerNodes = await seedNodes(ControllerNodeType.CAR_MODEL, partnerNodesAmount)

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
