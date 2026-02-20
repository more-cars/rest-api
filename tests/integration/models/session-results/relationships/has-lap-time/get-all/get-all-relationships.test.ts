import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        await seedRelationshipForStartNode(sessionResult.id, ControllerNodeType.LAP_TIME, RelationshipType.SessionResultHasLapTime)
        await seedRelationshipForStartNode(sessionResult.id, ControllerNodeType.LAP_TIME, RelationshipType.SessionResultHasLapTime)

        const relationships = await SessionResult.getAllHasLapTimeRelationships(sessionResult.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const relationships = await SessionResult.getAllHasLapTimeRelationships(sessionResult.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(SessionResult.getAllHasLapTimeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
