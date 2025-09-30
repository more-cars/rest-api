---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/delete/nodesDontExist.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('<%= h.changeCase.title(startNodeType) %> does not exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')

    await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('<%= h.changeCase.title(endNodeType) %> does not exist', async () => {
    const <%= h.changeCase.camel(endNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')

    await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(endNodeType) %>.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})