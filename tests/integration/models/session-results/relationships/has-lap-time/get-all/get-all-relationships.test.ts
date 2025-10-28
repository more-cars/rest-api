import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.LAP_TIME, DbRelationship.SessionResultHasLapTime)
        await seedRelationshipForStartNode(sessionResult.id, NodeTypeEnum.LAP_TIME, DbRelationship.SessionResultHasLapTime)

        const relationships = await SessionResult.getAllHasLapTimeRelationships(sessionResult.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

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
