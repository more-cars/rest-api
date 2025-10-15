---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/create-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>Relationship} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %>Relationship"

describe('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('with valid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.id,
            <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', <%= h.changeCase.camel(startNodeType) %>.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', <%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.id,
            -42,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
