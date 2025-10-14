---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.kebab(relationshipName) %>/marshalling-relationship-collection.test.ts

---
import {expect, test} from 'vitest'
import type {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {marshal<%= h.changeCase.pascal(relationshipName) %>Relationships} from "../../../../../../src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationships"

test("marshalling a collection of ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships", async () => {
    const relationships: Array<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> = [
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 1,
            <%= h.changeCase.snake(endNodeType) %>_id: 2,
            relationship_id: 3,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            relationship_partner: {
                id: 111,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 10,
            <%= h.changeCase.snake(endNodeType) %>_id: 20,
            relationship_id: 30,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            relationship_partner: {
                id: 222,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
        {
            <%= h.changeCase.snake(startNodeType) %>_id: 100,
            <%= h.changeCase.snake(endNodeType) %>_id: 200,
            relationship_id: 300,
            relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
            relationship_partner: {
                id: 333,
                created_at: "dummy",
                updated_at: "dummy",
            },
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        },
    ]

    const marshalledRelationships = marshalRelationships(relationships as BaseRelationship[], "<%= h.changeCase.lower(endNodeType) %>")

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
