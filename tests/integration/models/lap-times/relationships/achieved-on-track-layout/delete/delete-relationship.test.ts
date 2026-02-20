import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-on-track-layout‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, trackLayout.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and TRACK LAYOUT node do not exist', async () => {
        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›achieved-on-track-layout‹ relationship', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(LapTime.deleteAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›achieved-on-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.LAP_TIME, ControllerNodeType.TRACK_LAYOUT, RelationshipType.LapTimeAchievedOnTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteAchievedOnTrackLayoutRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
