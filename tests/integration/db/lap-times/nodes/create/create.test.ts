import {describe, expect, test} from 'vitest'
import {FakeLapTime} from "../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {createNode} from "../../../../../../src/db/nodes/lap-times/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeLapTime.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeLapTime.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
