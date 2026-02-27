import {describe, expect, test} from 'vitest'
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createNode} from "../../../../../../src/db/node-types/car-models/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCarModel.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCarModel.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
