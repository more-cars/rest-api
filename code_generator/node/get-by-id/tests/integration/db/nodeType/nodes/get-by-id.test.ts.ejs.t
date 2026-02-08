---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-by-id.test.ts
---
import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {<%= h.changeCase.pascal(nodeType) %>Schema} from "../../../../_toolbox/schemas/<%= h.changeCase.pascal(nodeType) %>Schema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a <%= h.changeCase.upper(nodeType) %> that does not exist should return "false"', async () => {
    const expected<%= h.changeCase.pascal(nodeType) %>Node = false
    const actual<%= h.changeCase.pascal(nodeType) %>Node = await getNodeById(-42)

    expect(actual<%= h.changeCase.pascal(nodeType) %>Node)
        .toBe(expected<%= h.changeCase.pascal(nodeType) %>Node)
})

test('Querying an existing <%= h.changeCase.upper(nodeType) %> should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
    const <%= h.changeCase.camel(nodeType) %>Node = await getNodeById(createdNode.id)

    expect(validateJson(<%= h.changeCase.camel(nodeType) %>Node, <%= h.changeCase.pascal(nodeType) %>Schema))
        .toBeTruthy()
})
