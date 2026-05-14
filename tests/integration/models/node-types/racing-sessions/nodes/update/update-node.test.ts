import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {FakeRacingSession} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import type {RacingSessionInput} from "../../../../../../../src/models/node-types/racing-sessions/types/RacingSessionInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RACING SESSION', () => {
    test('Node does not exist', async () => {
        await expect(RacingSession.update(-42, FakeRacingSession.dbInput() as RacingSessionInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSession)
        const inputData = FakeRacingSession.dbInput()
        const updatedNode = await RacingSession.update(createdNode.properties.id, inputData as RacingSessionInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSession)
        const validData = FakeRacingSession.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await RacingSession.update(createdNode.properties.id, inputData as RacingSessionInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
