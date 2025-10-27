import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-racing-event‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(racingSession.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_SESSION)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(-42, racingEvent.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING EVENT node do not exist', async () => {
        await expect(RacingSession.deleteBelongsToRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-racing-event‹ relationship', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingSession.deleteBelongsToRacingEventRelationship(racingSession.id, racingEvent.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_SESSION, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingSessionBelongsToRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSessionBelongsToRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteBelongsToRacingEventRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSessionBelongsToRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
