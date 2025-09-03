---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectToMultipleNodes.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.inflection.pluralize(h.changeCase.pascal(endNodeType)) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(endNodeType)) %>/nodes/seed<%= h.inflection.pluralize(h.changeCase.pascal(endNodeType)) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A <%= h.changeCase.title(startNodeType) %> cannot have multiple "<%= h.changeCase.lower(relationshipName) %>" relationships', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.inflection.pluralize(h.changeCase.camel(endNodeType)) %>Amount = 3
    const <%= h.inflection.pluralize(h.changeCase.camel(endNodeType)) %> = await seed<%= h.inflection.pluralize(h.changeCase.pascal(endNodeType)) %>(<%= h.inflection.pluralize(h.changeCase.camel(endNodeType)) %>Amount)

    for (const <%= h.changeCase.camel(endNodeType) %> of <%= h.inflection.pluralize(h.changeCase.camel(endNodeType)) %>) {
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id)
    }

    const relationships = await getRelationshipsForSpecificNode(<%= h.changeCase.camel(startNodeType) %>.id, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    expect(relationships.length)
        .toBe(1)
})
