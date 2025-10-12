---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/delete.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seed<%= h.changeCase.pascal(nodeType) %>} from "../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/seed<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a <%= h.changeCase.upper(nodeType) %>', () => {
    test('that does not exist', async () => {
        await expect(<%= h.changeCase.pascal(nodeType) %>.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seed<%= h.changeCase.pascal(nodeType) %>()
        await expect(<%= h.changeCase.pascal(nodeType) %>.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
