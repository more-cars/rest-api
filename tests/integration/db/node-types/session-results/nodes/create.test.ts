import {describe, expect, test} from 'vitest'
import {FakeSessionResult} from "../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeSessionResult.dbInput()
        const createdNode = await createDbNode(DbNodeType.SessionResult, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeSessionResult.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.SessionResult, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})