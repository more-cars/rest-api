import {describe, expect, test} from 'vitest'
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeModelCar.dbInput
        const createdNode = await createDbNode(DbNodeType.ModelCar, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeModelCar.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.ModelCar, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
