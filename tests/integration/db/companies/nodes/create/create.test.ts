import {expect, test} from 'vitest'
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import {createNode} from "../../../../../../src/db/nodes/companies/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeCompany.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
