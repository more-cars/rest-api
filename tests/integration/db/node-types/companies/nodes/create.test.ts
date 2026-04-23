import {describe, expect, test} from 'vitest'
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCompany.dbInput
        const createdNode = await createNeo4jNode(DbNodeType.Company, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCompany.dbInputMinimal
        const createdNode = await createNeo4jNode(DbNodeType.Company, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
