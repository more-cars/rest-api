import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›belongs-to-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const createdRelationship = await createRelationship(
            racingSession.properties.id,
            racingEvent.properties.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingSession.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSessionBelongsToRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        const createdRelationship = await createRelationship(
            racingSession.properties.id,
            -42,
            RelationshipType.RacingSessionBelongsToRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
