import {describe, expect, test} from 'vitest'
import {FakeModelCar} from "../../../../../_toolbox/fixtures/nodes/FakeModelCar"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeModelCar.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.ModelCar, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeModelCar.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.ModelCar, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
