import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {FakeRacingEvent} from "../../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import type {RacingEventInput} from "../../../../../../../src/models/node-types/racing-events/types/RacingEventInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RACING EVENT', () => {
    test('Node does not exist', async () => {
        await expect(RacingEvent.update(-42, FakeRacingEvent.dbInput() as RacingEventInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = FakeRacingEvent.dbInput()
        const updatedNode = await RacingEvent.update(createdNode.properties.id, inputData as RacingEventInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const validData = FakeRacingEvent.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await RacingEvent.update(createdNode.properties.id, inputData as RacingEventInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
