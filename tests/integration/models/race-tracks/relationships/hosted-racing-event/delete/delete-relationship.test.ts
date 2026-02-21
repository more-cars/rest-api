import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›hosted-racing-event‹ relationship', () => {
    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RaceTrack)

        await expect(RaceTrack.deleteHostedRacingEventRelationship(raceTrack.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

        await expect(RaceTrack.deleteHostedRacingEventRelationship(-42, racingEvent.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node and RACING EVENT node do not exist', async () => {
        await expect(RaceTrack.deleteHostedRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›hosted-racing-event‹ relationship', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RaceTrack)
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

        await expect(RaceTrack.deleteHostedRacingEventRelationship(raceTrack.properties.id, racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›hosted-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RaceTrack, ControllerNodeType.RacingEvent, RelationshipType.RaceTrackHostedRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHostedRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RaceTrack.deleteHostedRacingEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHostedRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
