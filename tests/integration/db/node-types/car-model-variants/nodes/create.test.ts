import {describe, expect, test} from 'vitest'
import {FakeCarModelVariant} from "../../../../../_toolbox/fixtures/nodes/FakeCarModelVariant"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCarModelVariant.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.CarModelVariant, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCarModelVariant.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.CarModelVariant, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})