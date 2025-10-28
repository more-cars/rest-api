import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.deleteHasLapTimeRelationship(-42, lapTime.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and LAP TIME node do not exist', async () => {
        await expect(SessionResult.deleteHasLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-lap-time‹ relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.id, lapTime.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.LAP_TIME, DbRelationship.SessionResultHasLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteHasLapTimeRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
