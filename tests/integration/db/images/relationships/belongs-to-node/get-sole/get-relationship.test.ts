import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting a ›belongs-to-node‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.Image, ControllerNodeType.Brand, RelationshipType.ImageBelongsToNode)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.ImageBelongsToNode,
            DbNodeType.Brand,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const image = await seedNode(ControllerNodeType.Image)

        const relationships = await getRelationshipCollection(
            image.properties.id,
            RelationshipType.ImageBelongsToNode,
            DbNodeType.Brand,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ImageBelongsToNode,
            DbNodeType.Brand,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
