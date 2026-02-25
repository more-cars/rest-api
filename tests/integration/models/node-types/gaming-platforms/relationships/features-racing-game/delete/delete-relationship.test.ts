import {describe, expect, test} from 'vitest'
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-racing-game‹ relationship', () => {
    test('GAMING PLATFORM node does not exist', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(gamingPlatform.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(-42, racingGame.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('GAMING PLATFORM node and RACING GAME node do not exist', async () => {
        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-racing-game‹ relationship', async () => {
        const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
        const racingGame = await seedNode(DbNodeType.RacingGame)

        await expect(GamingPlatform.deleteFeaturesRacingGameRelationship(gamingPlatform.properties.id, racingGame.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›features-racing-game‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.GamingPlatform, DbNodeType.RacingGame, RelationshipType.GamingPlatformFeaturesRacingGame)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await GamingPlatform.deleteFeaturesRacingGameRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.GamingPlatformFeaturesRacingGame,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
