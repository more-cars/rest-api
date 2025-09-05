---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/has/nodesExistsButNoRelationship.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')
    const <%= h.changeCase.camel(endNodeType) %> = await seedNode('<%= h.changeCase.lower(endNodeType) %>')

    await expect(<%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
