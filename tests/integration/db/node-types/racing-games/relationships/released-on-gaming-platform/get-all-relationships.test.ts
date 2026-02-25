import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›released-on-gaming-platform‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)
        await seedRelationshipForStartNode(racingGame.properties.id, DbNodeType.GamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform)
        await seedRelationshipForStartNode(racingGame.properties.id, DbNodeType.GamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform)

        const relationships = await getRelationshipCollection(
            racingGame.properties.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            DbNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        const relationships = await getRelationshipCollection(
            racingGame.properties.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            DbNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            DbNodeType.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
