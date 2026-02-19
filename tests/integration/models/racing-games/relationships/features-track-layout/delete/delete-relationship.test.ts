import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›features-track-layout‹ relationship', () => {
    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(racingGame.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(-42, trackLayout.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and TRACK LAYOUT node do not exist', async () => {
        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›features-track-layout‹ relationship', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(RacingGame.deleteFeaturesTrackLayoutRelationship(racingGame.id, trackLayout.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›features-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_GAME, NodeTypeEnum.TRACK_LAYOUT, RelationshipType.RacingGameFeaturesTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingGame.deleteFeaturesTrackLayoutRelationship(seededRelationship.start_node.id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.RacingGameFeaturesTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
