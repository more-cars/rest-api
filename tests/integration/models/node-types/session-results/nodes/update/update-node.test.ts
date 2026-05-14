import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {FakeSessionResult} from "../../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import type {SessionResultInput} from "../../../../../../../src/models/node-types/session-results/types/SessionResultInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a SESSION RESULT', () => {
    test('Node does not exist', async () => {
        await expect(SessionResult.update(-42, FakeSessionResult.dbInput() as SessionResultInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = FakeSessionResult.dbInput()
        const updatedNode = await SessionResult.update(createdNode.properties.id, inputData as SessionResultInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const validData = FakeSessionResult.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await SessionResult.update(createdNode.properties.id, inputData as SessionResultInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
