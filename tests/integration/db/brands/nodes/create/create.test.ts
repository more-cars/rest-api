import {describe, expect, test} from 'vitest'
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {createNode} from "../../../../../../src/db/nodes/brands/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeBrand.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeBrand.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })
})