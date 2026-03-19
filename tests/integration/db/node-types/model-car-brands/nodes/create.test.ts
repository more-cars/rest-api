import {describe, expect, test} from 'vitest'
import {FakeModelCarBrand} from "../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import {createNode} from "../../../../../../src/db/node-types/model-car-brands/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeModelCarBrand.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeModelCarBrand.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
