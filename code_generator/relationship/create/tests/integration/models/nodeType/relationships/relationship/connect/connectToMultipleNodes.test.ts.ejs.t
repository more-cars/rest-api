---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectToMultipleNodes.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A <%= h.changeCase.title(startNodeType) %> can have multiple ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>Amount = 3
    const <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %> = await seed<%= h.changeCase.pascal(h.inflection.pluralize(endNodeType)) %>(<%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>Amount)

    for (const <%= h.changeCase.camel(endNodeType) %> of <%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>) {
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id)
    }

    const relationships = await getRelationshipsForSpecificNode(<%= h.changeCase.camel(startNodeType) %>.id, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    expect(relationships.length)
        .toBe(<%= h.changeCase.camel(h.inflection.pluralize(endNodeType)) %>Amount)
})
