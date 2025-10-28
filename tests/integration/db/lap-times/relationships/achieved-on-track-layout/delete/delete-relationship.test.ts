import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Trying to delete a ›achieved-on-track-layout‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.TRACK_LAYOUT, DbRelationship.LapTimeAchievedOnTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationship = await deleteSpecificRelationship(
            lapTime.id,
            trackLayout.id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
