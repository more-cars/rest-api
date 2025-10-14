---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/connecting-non-existent-nodes.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship with nodes that do not exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(endNodeType) %>.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
