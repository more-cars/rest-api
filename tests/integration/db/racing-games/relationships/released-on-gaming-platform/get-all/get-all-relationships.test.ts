import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›released-on-gaming-platform‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        await seedRelationshipForStartNode(racingGame.id, NodeTypeEnum.GAMING_PLATFORM, RelationshipType.RacingGameReleasedOnGamingPlatform)
        await seedRelationshipForStartNode(racingGame.id, NodeTypeEnum.GAMING_PLATFORM, RelationshipType.RacingGameReleasedOnGamingPlatform)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            NodeTypeLabel.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        const relationships = await getRelationshipCollection(
            racingGame.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            NodeTypeLabel.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
            NodeTypeLabel.GamingPlatform,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
