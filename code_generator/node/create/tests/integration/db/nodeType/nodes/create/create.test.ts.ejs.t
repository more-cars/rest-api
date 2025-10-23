---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create/create.test.ts
---
import {expect, test} from 'vitest'
import {Fake<%= h.changeCase.pascal(nodeType) %>} from "../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"
import {createNode} from "../../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"

test('Creating node with valid data', async () => {
    const inputData = Fake<%= h.changeCase.pascal(nodeType) %>.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
