---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/nodes/delete.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(nodeType) %>} from "../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a <%= h.changeCase.upper(nodeType) %>', () => {
    test('that does not exist', async () => {
        await expect(<%= h.changeCase.pascal(nodeType) %>.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>)
        await expect(<%= h.changeCase.pascal(nodeType) %>.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
