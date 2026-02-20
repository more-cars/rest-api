import {describe, expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {createNode} from "../../../../../../src/db/nodes/car-model-variants/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCarModelVariant.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCarModelVariant.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})