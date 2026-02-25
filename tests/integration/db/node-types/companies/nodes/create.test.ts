import {describe, expect, test} from 'vitest'
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import {createNode} from "../../../../../../src/db/node-types/companies/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeCompany.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeCompany.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
