import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›released-on-gaming-platform‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        await seedRelationshipForStartNode(racingGame.id, ControllerNodeType.GAMING_PLATFORM, RelationshipType.RacingGameReleasedOnGamingPlatform)
        await seedRelationshipForStartNode(racingGame.id, ControllerNodeType.GAMING_PLATFORM, RelationshipType.RacingGameReleasedOnGamingPlatform)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            Neo4jNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            Neo4jNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            Neo4jNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
