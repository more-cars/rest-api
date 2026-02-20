import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting a ›has-successor‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.CAR_MODEL, ControllerNodeType.CAR_MODEL, RelationshipType.CarModelHasSuccessor)

        const relationships = await getRelationshipCollection(
            relationship.start_node.id,
            RelationshipType.CarModelHasSuccessor,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.id,
            RelationshipType.CarModelHasSuccessor,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelHasSuccessor,
            NodeTypeLabel.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
