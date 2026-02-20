import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›released-on-gaming-platform‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(racingGame.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(-42, gamingPlatform.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and GAMING PLATFORM node do not exist', async () => {
        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›released-on-gaming-platform‹ relationship', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        const gamingPlatform = await seedNode(ControllerNodeType.GAMING_PLATFORM)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(racingGame.id, gamingPlatform.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›released-on-gaming-platform‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_GAME, ControllerNodeType.GAMING_PLATFORM, RelationshipType.RacingGameReleasedOnGamingPlatform)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteReleasedOnGamingPlatformRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
