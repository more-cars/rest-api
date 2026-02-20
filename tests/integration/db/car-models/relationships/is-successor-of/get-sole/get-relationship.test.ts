import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting a ›is-successor-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.CAR_MODEL, ControllerNodeType.CAR_MODEL, RelationshipType.CarModelIsSuccessorOf)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.CarModelIsSuccessorOf,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.properties.id,
            RelationshipType.CarModelIsSuccessorOf,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelIsSuccessorOf,
            DbNodeType.CarModel,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
