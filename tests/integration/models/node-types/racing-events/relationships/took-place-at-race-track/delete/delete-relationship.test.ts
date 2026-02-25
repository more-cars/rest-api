import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›took-place-at-race-track‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingEvent.deleteTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(RacingEvent.deleteTookPlaceAtRaceTrackRelationship(-42, raceTrack.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACE TRACK node do not exist', async () => {
        await expect(RacingEvent.deleteTookPlaceAtRaceTrackRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›took-place-at-race-track‹ relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(RacingEvent.deleteTookPlaceAtRaceTrackRelationship(racingEvent.properties.id, raceTrack.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›took-place-at-race-track‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.RaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteTookPlaceAtRaceTrackRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
