import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A CAR MODEL cannot have multiple ›has-successor‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const partnerNodesAmount = 3
    const partnerNodes = await seedNodes(NodeTypeEnum.CAR_MODEL, partnerNodesAmount)

    for (const partnerNode of partnerNodes) {
        await CarModel.createHasSuccessorRelationship(carModel.id, partnerNode.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        RelationshipType.CarModelHasSuccessor,
        NodeTypeLabel.CarModel,
    )

    expect(relationships.length)
        .toBe(1)
})
