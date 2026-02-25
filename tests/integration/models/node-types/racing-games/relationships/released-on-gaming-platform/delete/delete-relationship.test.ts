import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›released-on-gaming-platform‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(racingGame.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(-42, gamingPlatform.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and GAMING PLATFORM node do not exist', async () => {
        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›released-on-gaming-platform‹ relationship', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        await expect(RacingGame.deleteReleasedOnGamingPlatformRelationship(racingGame.properties.id, gamingPlatform.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›released-on-gaming-platform‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingGame, DbNodeType.GamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteReleasedOnGamingPlatformRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameReleasedOnGamingPlatform,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
