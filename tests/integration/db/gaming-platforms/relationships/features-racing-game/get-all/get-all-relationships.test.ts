import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›features-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, DbNodeType.RacingGame, RelationshipType.GamingPlatformFeaturesRacingGame)
        await seedRelationshipForStartNode(gamingPlatform.properties.id, DbNodeType.RacingGame, RelationshipType.GamingPlatformFeaturesRacingGame)

        const relationships = await getRelationshipCollection(
            gamingPlatform.properties.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        const relationships = await getRelationshipCollection(
            gamingPlatform.properties.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
