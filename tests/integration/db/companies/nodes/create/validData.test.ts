import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/companies/createNode"
import FakeCompany from "../../../../../_toolbox/fixtures/nodes/FakeCompany"

test('Creating node with valid data', async () => {
    const createdNode = await createNode(FakeCompany)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeCompany))
})
