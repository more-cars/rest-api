import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›used-the-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            trackLayout.id,
            DbRelationship.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.RacingEventUsedTheTrackLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            DbRelationship.RacingEventUsedTheTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
