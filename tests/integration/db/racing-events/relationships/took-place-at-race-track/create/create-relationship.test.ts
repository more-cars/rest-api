import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›took-place-at-race-track‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            raceTrack.properties.id,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', raceTrack.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingEventTookPlaceAtRaceTrack)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            -42,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
