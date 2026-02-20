import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(TrackLayout.deleteHasLapTimeRelationship(trackLayout.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(TrackLayout.deleteHasLapTimeRelationship(-42, lapTime.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and LAP TIME node do not exist', async () => {
        await expect(TrackLayout.deleteHasLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-lap-time‹ relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        await expect(TrackLayout.deleteHasLapTimeRelationship(trackLayout.id, lapTime.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.TRACK_LAYOUT, ControllerNodeType.LAP_TIME, RelationshipType.TrackLayoutHasLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteHasLapTimeRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutHasLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
