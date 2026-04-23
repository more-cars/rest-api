import {describe, expect, test} from 'vitest'
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeBrand.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Brand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeBrand.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Brand, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
