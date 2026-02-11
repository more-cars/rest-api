import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›is-featured-in-racing-game‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(trackLayout.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node does not exist', async () => {
        const racingGame = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(-42, racingGame.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING GAME node and RACING GAME node do not exist', async () => {
        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-featured-in-racing-game‹ relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        await expect(TrackLayout.deleteIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›is-featured-in-racing-game‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.RACING_GAME, DbRelationship.TrackLayoutIsFeaturedInRacingGame)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteIsFeaturedInRacingGameRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutIsFeaturedInRacingGame,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
