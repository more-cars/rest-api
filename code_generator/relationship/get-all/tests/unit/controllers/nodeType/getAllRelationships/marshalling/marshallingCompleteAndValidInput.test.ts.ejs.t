---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relationships/marshalling/marshallingCompleteAndValidInput.test.ts
---
import {expect, test} from 'vitest'
import type {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../../../../src/models/companies/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {marshal<%= h.changeCase.pascal(relationshipName) %>Relationships} from "../../../../../../src/controllers/companies/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationships"

test('marshalling a complete and valid request', async () => {
    const relationships: Array<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> = [
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 1,
            <%= h.changeCase.snake(endNodeType) %>_id: 2,
            relationship_id: 3,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 10,
            <%= h.changeCase.snake(endNodeType) %>_id: 20,
            relationship_id: 30,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        },
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 100,
            <%= h.changeCase.snake(endNodeType) %>_id: 200,
            relationship_id: 300,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",

        }
    ]

    const mappedNode = marshalHasBrandRelationships(relationships)

    expect(mappedNode)
        .toStrictEqual([
            {
                <%= h.changeCase.snake(startNodeType) %>_id: 1,
                <%= h.changeCase.snake(endNodeType) %>_id: 2,
                relationship_id: 3,
                relationship_name: "<%= h.changeCase.kebab(relationshipName) %>",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                <%= h.changeCase.snake(startNodeType) %>_id: 10,
                <%= h.changeCase.snake(endNodeType) %>_id: 20,
                relationship_id: 30,
                relationship_name: "<%= h.changeCase.kebab(relationshipName) %>",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            },
            {
                <%= h.changeCase.snake(startNodeType) %>_id: 100,
                <%= h.changeCase.snake(endNodeType) %>_id: 200,
                relationship_id: 300,
                relationship_name: "<%= h.changeCase.kebab(relationshipName) %>",
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",

            }
        ])
})
