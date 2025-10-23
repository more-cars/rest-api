import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›was-used-by-racing-event‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(trackLayout.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(-42, racingEvent.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING EVENT node do not exist', async () => {
        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›was-used-by-racing-event‹ relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›was-used-by-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.RACING_EVENT, DbRelationship.TrackLayoutWasUsedByRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteWasUsedByRacingEventRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
