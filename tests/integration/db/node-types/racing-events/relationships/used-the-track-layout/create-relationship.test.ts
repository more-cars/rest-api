import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›used-the-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            trackLayout.properties.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', trackLayout.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingEventUsedTheTrackLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            -42,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
