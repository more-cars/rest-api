---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/getById.test.ts
---
import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"
import {<%= h.changeCase.pascal(nodeType) %>Node} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Node"
import {<%= h.changeCase.pascal(nodeType) %>Schema} from "../../../../_toolbox/schemas/<%= h.changeCase.pascal(nodeType) %>Schema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a <%= h.changeCase.upper(nodeType) %> that does not exist should return "false"', async () => {
    const expected<%= h.changeCase.pascal(nodeType) %>Node = false
    const actual<%= h.changeCase.pascal(nodeType) %>Node = await getNodeById(-42)

    expect(actual<%= h.changeCase.pascal(nodeType) %>Node)
        .toBe(expected<%= h.changeCase.pascal(nodeType) %>Node)
})

test('Querying an existing <%= h.changeCase.upper(nodeType) %> should return a db node with correct schema', async () => {
    const createdNode: <%= h.changeCase.pascal(nodeType) %>Node = await seed<%= h.changeCase.pascal(nodeType) %>()
    const <%= h.changeCase.camel(nodeType) %>Node = await getNodeById(createdNode.id)

    expect(validateJson(<%= h.changeCase.camel(nodeType) %>Node, <%= h.changeCase.pascal(nodeType) %>Schema))
        .toBeTruthy()
})
