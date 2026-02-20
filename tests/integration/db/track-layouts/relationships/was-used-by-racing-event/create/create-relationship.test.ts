import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›was-used-by-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            racingEvent.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.TrackLayoutWasUsedByRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
