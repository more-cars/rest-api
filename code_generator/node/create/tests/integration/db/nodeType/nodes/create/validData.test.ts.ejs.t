---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/create/validData.test.ts
---
import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"
import Fake<%= h.changeCase.pascal(nodeType) %> from "../../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(nodeType) %>"

test('Creating node with valid data', async () => {
    const createdNode = await createNode(Fake<%= h.changeCase.pascal(nodeType) %>)

    expect(createdNode)
        .toEqual(expect.objectContaining(Fake<%= h.changeCase.pascal(nodeType) %>))
})
