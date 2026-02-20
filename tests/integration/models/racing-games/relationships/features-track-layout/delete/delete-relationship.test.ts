import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-track-layout‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(racingGame.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(-42, trackLayout.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and TRACK LAYOUT node do not exist', async () => {
        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-track-layout‹ relationship', async () => {
        const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›features-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_GAME, ControllerNodeType.TRACK_LAYOUT, RelationshipType.RacingGameFeaturesTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteFeaturesTrackLayoutRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
