import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.COMPANY, RelationshipType.ImageBelongsToNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.CAR_MODEL, RelationshipType.ImageBelongsToNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, RelationshipType.ImageBelongsToNode)

        const relationships = await getRelationshipCollection(
            image.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const relationships = await getRelationshipCollection(
            image.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ImageBelongsToNode,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
