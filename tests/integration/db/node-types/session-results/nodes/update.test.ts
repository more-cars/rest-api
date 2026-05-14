import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeSessionResult} from "../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputSessionResultCreate} from "../../../../../../src/db/node-types/session-results/types/InputSessionResultCreate"
import type {SessionResultNode} from "../../../../../../src/db/node-types/session-results/types/SessionResultNode"

describe('Updating SESSION RESULT', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = FakeSessionResult.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.SessionResult, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = createdNode.properties as unknown as InputSessionResultCreate
        const updatedNode = await updateDbNode(DbNodeType.SessionResult, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.SessionResult)
        const inputData = createdNode.properties as unknown as InputSessionResultCreate
        // @ts-ignore
        inputData.driver_name = null
        const updatedNode = await updateDbNode(DbNodeType.SessionResult, createdNode.properties.id, inputData) as SessionResultNode

        expect(updatedNode.properties.driver_name)
            .toBeNull()
    })
})
