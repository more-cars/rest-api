import {describe, expect, test} from 'vitest'
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCompany.dbInput
        const createdNode = await createDbNode(DbNodeType.Company, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCompany.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.Company, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
