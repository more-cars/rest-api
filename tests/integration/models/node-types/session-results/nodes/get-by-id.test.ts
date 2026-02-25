import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a SESSION RESULT', () => {
    test('which does not exist', async () => {
        await expect(SessionResult.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedSessionResult = await seedNode(DbNodeType.SessionResult)
        const actualSessionResult = await SessionResult.findById(expectedSessionResult.properties.id)

        expect(actualSessionResult.attributes)
            .toEqual(expectedSessionResult.properties)
    })
})
