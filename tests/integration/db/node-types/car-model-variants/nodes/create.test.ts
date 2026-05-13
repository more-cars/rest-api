import {describe, expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCarModelVariant.dbInput()
        const createdNode = await createDbNode(DbNodeType.CarModelVariant, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCarModelVariant.dbInputMinimal()
        const createdNode = await createDbNode(DbNodeType.CarModelVariant, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})