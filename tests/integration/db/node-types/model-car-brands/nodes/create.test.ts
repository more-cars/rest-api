import {describe, expect, test} from 'vitest'
import {FakeModelCarBrand} from "../../../../../_toolbox/fixtures/nodes/FakeModelCarBrand"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeModelCarBrand.dbInput
        const createdNode = await createDbNode(DbNodeType.ModelCarBrand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeModelCarBrand.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.ModelCarBrand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
