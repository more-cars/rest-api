import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›is-followed-by-event‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(racingEvent.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(-42, partner.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and PARTNER node do not exist', async () => {
        await expect(RacingEvent.deleteIsFollowedByEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›is-followed-by-event‹ relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const partner = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.deleteIsFollowedByEventRelationship(racingEvent.id, partner.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›is-followed-by-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingEventIsFollowedByEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingEventIsFollowedByEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteIsFollowedByEventRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingEventIsFollowedByEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
