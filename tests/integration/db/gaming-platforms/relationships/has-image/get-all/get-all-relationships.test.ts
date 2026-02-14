import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.IMAGE, DbRelationship.GamingPlatformHasImage)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.IMAGE, DbRelationship.GamingPlatformHasImage)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
            DbRelationship.GamingPlatformHasImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
            DbRelationship.GamingPlatformHasImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.GamingPlatformHasImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
