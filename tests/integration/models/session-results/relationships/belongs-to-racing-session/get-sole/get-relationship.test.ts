import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›belongs-to-racing-session‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.RACING_SESSION, DbRelationship.SessionResultBelongsToRacingSession)
        const expectedSessionResultId = expectedRelationship.start_node_id
        const expectedRacingSessionId = expectedRelationship.end_node_id
        const actualRelationship = await SessionResult.getBelongsToRacingSessionRelationship(expectedSessionResultId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedSessionResultId)

        expect(actualRelationship.destination.id)
            .toBe(expectedRacingSessionId)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        await expect(SessionResult.getBelongsToRacingSessionRelationship(sessionResult.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(SessionResult.getBelongsToRacingSessionRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
