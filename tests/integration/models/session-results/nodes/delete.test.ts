import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../src/models/session-results/SessionResult"
import {seedSessionResult} from "../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResult"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a SESSION RESULT', () => {
    test('that does not exist', async () => {
        await expect(SessionResult.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedSessionResult()
        await expect(SessionResult.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
