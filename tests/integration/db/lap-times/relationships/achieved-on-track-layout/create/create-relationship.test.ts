import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›achieved-on-track-layout‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const createdRelationship = await createRelationship(
            lapTime.id,
            trackLayout.id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', trackLayout.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.LapTimeAchievedOnTrackLayout)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const createdRelationship = await createRelationship(
            lapTime.id,
            -42,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
