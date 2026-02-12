import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›belongs-to-session-result‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        await expect(LapTime.deleteBelongsToSessionResultRelationship(lapTime.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(LapTime.deleteBelongsToSessionResultRelationship(-42, sessionResult.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and SESSION RESULT node do not exist', async () => {
        await expect(LapTime.deleteBelongsToSessionResultRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-session-result‹ relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(LapTime.deleteBelongsToSessionResultRelationship(lapTime.id, sessionResult.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-session-result‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.SESSION_RESULT, DbRelationship.LapTimeBelongsToSessionResult)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeBelongsToSessionResult,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteBelongsToSessionResultRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.LapTimeBelongsToSessionResult,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
