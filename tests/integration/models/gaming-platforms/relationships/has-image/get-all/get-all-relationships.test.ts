import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, ControllerNodeType.IMAGE, RelationshipType.GamingPlatformHasImage)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, ControllerNodeType.IMAGE, RelationshipType.GamingPlatformHasImage)

        const relationships = await GamingPlatform.getAllHasImageRelationships(gamingPlatform.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        const relationships = await GamingPlatform.getAllHasImageRelationships(gamingPlatform.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(GamingPlatform.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
