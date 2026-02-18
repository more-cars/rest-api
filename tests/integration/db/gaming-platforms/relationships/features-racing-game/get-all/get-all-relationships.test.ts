import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›features-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.RACING_GAME, RelationshipType.GamingPlatformFeaturesRacingGame)
        await seedRelationshipForStartNode(gamingPlatform.id, NodeTypeEnum.RACING_GAME, RelationshipType.GamingPlatformFeaturesRacingGame)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        const relationships = await getRelationshipCollection(
            gamingPlatform.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.GamingPlatformFeaturesRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
