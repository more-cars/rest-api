import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›features-racing-game‹ relationship', () => {
    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(gamingPlatform.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(-42, racingGame.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node and RACING GAME node do not exist', async () => {
        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-racing-game‹ relationship', async () => {
        const gamingPlatform = await seedNode(NodeTypeEnum.GAMING_PLATFORM)
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(gamingPlatform.id, racingGame.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›features-racing-game‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.GAMING_PLATFORM, NodeTypeEnum.RACING_GAME, RelationshipType.GamingPlatformFeaturesRacingGame)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await GamingPlatform.deleteFeaturesRacingGameRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
