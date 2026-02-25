import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, DbNodeType.Image, RelationshipType.GamingPlatformHasImage)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, DbNodeType.Image, RelationshipType.GamingPlatformHasImage)

        const relationships = await GamingPlatform.getAllHasImageRelationships(gamingPlatform.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

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
