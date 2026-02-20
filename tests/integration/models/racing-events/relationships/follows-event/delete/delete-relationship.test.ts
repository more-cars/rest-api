import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›follows-event‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        await expect(RacingEvent.deleteFollowsEventRelationship(racingEvent.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(ControllerNodeType.RACING_EVENT)

        await expect(RacingEvent.deleteFollowsEventRelationship(-42, partner.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and PARTNER node do not exist', async () => {
        await expect(RacingEvent.deleteFollowsEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›follows-event‹ relationship', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const partner = await seedNode(ControllerNodeType.RACING_EVENT)

        await expect(RacingEvent.deleteFollowsEventRelationship(racingEvent.id, partner.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›follows-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.RACING_EVENT, RelationshipType.RacingEventFollowsEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RacingEventFollowsEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteFollowsEventRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RacingEventFollowsEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
