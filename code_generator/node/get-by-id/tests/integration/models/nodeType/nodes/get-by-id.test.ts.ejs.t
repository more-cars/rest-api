---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-by-id.test.ts
---
import {expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Fetching a <%= h.changeCase.upper(nodeType) %> that does not exist should return "false"', async () => {
    const expected<%= h.changeCase.pascal(nodeType) %> = false
    const actual<%= h.changeCase.pascal(nodeType) %> = await <%= h.changeCase.pascal(nodeType) %>.findById(-42)

    expect(actual<%= h.changeCase.pascal(nodeType) %>)
        .toEqual(expected<%= h.changeCase.pascal(nodeType) %>)
})

test('When the <%= h.changeCase.upper(nodeType) %> exists it should be returned', async () => {
    const expected<%= h.changeCase.pascal(nodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
    const actual<%= h.changeCase.pascal(nodeType) %> = await <%= h.changeCase.pascal(nodeType) %>.findById(expected<%= h.changeCase.pascal(nodeType) %>.id)

    expect(actual<%= h.changeCase.pascal(nodeType) %>)
        .toEqual(expected<%= h.changeCase.pascal(nodeType) %>)
})
