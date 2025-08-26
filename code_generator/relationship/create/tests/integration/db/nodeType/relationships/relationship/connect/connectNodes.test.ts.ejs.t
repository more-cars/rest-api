---
to: tests/integration/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectNodes.test.ts
---
import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

test('Creating the relationship when both nodes exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

    const createdRelationship = await createRelationship(
        <%= h.changeCase.camel(startNodeType) %>.id,
        <%= h.changeCase.camel(endNodeType) %>.id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', <%= h.changeCase.camel(startNodeType) %>.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', <%= h.changeCase.camel(endNodeType) %>.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()

    const createdRelationship = await createRelationship(
        <%= h.changeCase.camel(startNodeType) %>.id,
        -42,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(createdRelationship)
        .toEqual(false)
})
