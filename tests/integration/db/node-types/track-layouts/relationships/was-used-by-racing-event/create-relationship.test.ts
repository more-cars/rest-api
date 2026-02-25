import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›was-used-by-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            racingEvent.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.TrackLayoutWasUsedByRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            trackLayout.properties.id,
            -42,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
