import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›features-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)
        await seedRelationshipForStartNode(gamingPlatform.id, ControllerNodeType.RACING_GAME, RelationshipType.GamingPlatformFeaturesRacingGame)
        await seedRelationshipForStartNode(gamingPlatform.id, ControllerNodeType.RACING_GAME, RelationshipType.GamingPlatformFeaturesRacingGame)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            DbNodeType.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
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
