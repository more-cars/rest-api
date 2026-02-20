import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›used-the-track-layout‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        await expect(RacingEvent.deleteUsedTheTrackLayoutRelationship(racingEvent.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RacingEvent.deleteUsedTheTrackLayoutRelationship(-42, trackLayout.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and TRACK LAYOUT node do not exist', async () => {
        await expect(RacingEvent.deleteUsedTheTrackLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›used-the-track-layout‹ relationship', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RacingEvent.deleteUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›used-the-track-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.TRACK_LAYOUT, RelationshipType.RacingEventUsedTheTrackLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteUsedTheTrackLayoutRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
