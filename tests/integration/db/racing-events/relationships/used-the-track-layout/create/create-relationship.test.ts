import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›used-the-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            trackLayout.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', trackLayout.id)
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
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
