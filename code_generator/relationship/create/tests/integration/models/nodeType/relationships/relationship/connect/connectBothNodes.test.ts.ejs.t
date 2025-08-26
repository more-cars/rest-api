---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectBothNodes.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

test('Creating a "<%= h.inflection.humanize(relationshipName, true) %>" relationship', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

    const createdRelationship = await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id)

    expect(createdRelationship)
        .toHaveProperty('<%= h.changeCase.snake(startNodeType) %>_id', <%= h.changeCase.camel(startNodeType) %>.id)
    expect(createdRelationship)
        .toHaveProperty('<%= h.changeCase.kebab(endNodeType) %>_id', <%= h.changeCase.camel(endNodeType) %>.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})
