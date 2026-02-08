import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"

describe('Requesting a ›belongs-to-node‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.IMAGE, NodeTypeEnum.BRAND, DbRelationship.ImageBelongsToNode)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const relationships = await getRelationshipCollection(
            image.id,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
