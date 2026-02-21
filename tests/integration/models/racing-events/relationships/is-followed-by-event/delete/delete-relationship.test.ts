import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›is-followed-by-event‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(racingEvent.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(ControllerNodeType.RacingEvent)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(-42, partner.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and PARTNER node do not exist', async () => {
        await expect(RacingEvent.deleteIsFollowedByEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-followed-by-event‹ relationship', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
        const partner = await seedNode(ControllerNodeType.RacingEvent)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(racingEvent.properties.id, partner.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›is-followed-by-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RacingEvent, ControllerNodeType.RacingEvent, RelationshipType.RacingEventIsFollowedByEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventIsFollowedByEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteIsFollowedByEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventIsFollowedByEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
