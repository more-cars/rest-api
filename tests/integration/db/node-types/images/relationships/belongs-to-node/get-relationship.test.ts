import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"

describe('Requesting a ›belongs-to-node‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.Image, DbNodeType.Brand, RelationshipType.ImageBelongsToNode)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.ImageBelongsToNode,
            DbNodeType.Brand,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const image = await seedNode(DbNodeType.Image)

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
