import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›was-used-by-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            racingEvent.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('start_node_id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.TrackLayoutWasUsedByRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            trackLayout.id,
            -42,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
