---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/get-by-id.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a <%= h.changeCase.upper(nodeType) %>', () => {
    test('which does not exist', async () => {
        await expect(<%= h.changeCase.pascal(nodeType) %>.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expected<%= h.changeCase.pascal(nodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(nodeType) %>)
        const actual<%= h.changeCase.pascal(nodeType) %> = await <%= h.changeCase.pascal(nodeType) %>.findById(expected<%= h.changeCase.pascal(nodeType) %>.id)

        expect(actual<%= h.changeCase.pascal(nodeType) %>)
            .toEqual(expected<%= h.changeCase.pascal(nodeType) %>)
    })
})
