import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.COMPANY, DbRelationship.ImageBelongsToNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.ImageBelongsToNode)

        const relationships = await getRelationshipCollection(
            image.id,
            DbRelationship.ImageBelongsToNode,
            NodeTypeLabel.Brand,
            RelationshipDirection.REVERSE,
        )

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const relationships = await getRelationshipCollection(
            image.id,
            DbRelationship.ImageBelongsToNode,
            NodeTypeLabel.Brand,
            RelationshipDirection.REVERSE,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.ImageBelongsToNode,
            NodeTypeLabel.Brand,
            RelationshipDirection.REVERSE,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
