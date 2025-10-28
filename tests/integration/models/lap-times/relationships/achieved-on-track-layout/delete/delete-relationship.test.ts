import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›achieved-on-track-layout‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, trackLayout.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and TRACK LAYOUT node do not exist', async () => {
        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-on-track-layout‹ relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›achieved-on-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.TRACK_LAYOUT, DbRelationship.LapTimeAchievedOnTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteAchievedOnTrackLayoutRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
