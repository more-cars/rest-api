import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-racing-session‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(racingEvent.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(-42, racingSession.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING SESSION node do not exist', async () => {
        await expect(RacingEvent.deleteHasRacingSessionRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-racing-session‹ relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(RacingEvent.deleteHasRacingSessionRelationship(racingEvent.id, racingSession.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-racing-session‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.RACING_SESSION, RelationshipType.RacingEventHasRacingSession)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteHasRacingSessionRelationship(seededRelationship.start_node.id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node_id,
            RelationshipType.RacingEventHasRacingSession,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
