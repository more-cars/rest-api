import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›hosted-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const createdRelationship = await createRelationship(
            raceTrack.properties.id,
            racingEvent.properties.id,
            RelationshipType.RaceTrackHostedRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', raceTrack.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RaceTrackHostedRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        const createdRelationship = await createRelationship(
            raceTrack.properties.id,
            -42,
            RelationshipType.RaceTrackHostedRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
