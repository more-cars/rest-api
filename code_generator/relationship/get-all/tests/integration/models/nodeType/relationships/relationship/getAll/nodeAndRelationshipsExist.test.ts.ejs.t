---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getAll/nodeAndRelationshipsExist.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('<%= h.changeCase.upper(startNodeType) %> exists and has ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.id, '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
    await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.id, '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    const relationships = await <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>.id)

    expect(relationships.length)
        .toBe(2)
})
