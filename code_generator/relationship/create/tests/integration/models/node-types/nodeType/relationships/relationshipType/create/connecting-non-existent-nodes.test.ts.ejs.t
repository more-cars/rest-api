---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/connecting-non-existent-nodes.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship with nodes that do not exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(endNodeType) %>)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
