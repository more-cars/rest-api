import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(SessionResult.deleteHasLapTimeRelationship(-42, lapTime.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and LAP TIME node do not exist', async () => {
        await expect(SessionResult.deleteHasLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-lap-time‹ relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.id, lapTime.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.LAP_TIME, RelationshipType.SessionResultHasLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.SessionResultHasLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteHasLapTimeRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.SessionResultHasLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
