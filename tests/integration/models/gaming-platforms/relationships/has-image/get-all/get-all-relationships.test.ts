import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.IMAGE, DbRelationship.GamingPlatformHasImage)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.IMAGE, DbRelationship.GamingPlatformHasImage)

        const relationships = await GamingPlatform.getAllHasImageRelationships(gamingPlatform.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const relationships = await GamingPlatform.getAllHasImageRelationships(gamingPlatform.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(GamingPlatform.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
