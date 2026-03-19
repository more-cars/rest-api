import {describe, expect, test} from 'vitest'
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {createNode} from "../../../../../../src/db/node-types/model-cars/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeModelCar.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeModelCar.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
