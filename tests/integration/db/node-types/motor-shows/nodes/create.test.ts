import {describe, expect, test} from 'vitest'
import {FakeMotorShow} from "../../../../../_toolbox/fixtures/nodes/FakeMotorShow"
import {createNode} from "../../../../../../src/db/node-types/motor-shows/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeMotorShow.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeMotorShow.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
