import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Trying to delete a ›took-place-at-race-track‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACE_TRACK, DbRelationship.RacingEventTookPlaceAtRaceTrack)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingEventTookPlaceAtRaceTrack,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const relationship = await deleteSpecificRelationship(
            racingEvent.id,
            raceTrack.id,
            DbRelationship.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
