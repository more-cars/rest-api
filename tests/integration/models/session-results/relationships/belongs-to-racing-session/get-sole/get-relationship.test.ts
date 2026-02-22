import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-racing-session‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.SessionResult, DbNodeType.RacingSession, RelationshipType.SessionResultBelongsToRacingSession)
        const expectedSessionResultId = expectedRelationship.start_node.properties.id
        const expectedRacingSessionId = expectedRelationship.end_node.properties.id
        const actualRelationship = await SessionResult.getBelongsToRacingSessionRelationship(expectedSessionResultId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedSessionResultId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedRacingSessionId)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        await expect(SessionResult.getBelongsToRacingSessionRelationship(sessionResult.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(SessionResult.getBelongsToRacingSessionRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
