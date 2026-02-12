import {describe, expect, test} from 'vitest'
import {FakeSessionResult} from "../../../../../_toolbox/fixtures/nodes/FakeSessionResult"
import {createNode} from "../../../../../../src/db/nodes/session-results/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeSessionResult.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeSessionResult.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })
})