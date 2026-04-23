import {describe, expect, test} from 'vitest'
import {FakeCarModel} from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCarModel.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.CarModel, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCarModel.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.CarModel, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
