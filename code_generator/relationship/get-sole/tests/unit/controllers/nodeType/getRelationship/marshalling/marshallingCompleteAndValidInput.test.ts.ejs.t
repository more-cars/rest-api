---
to: tests/unit/controllers/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relationship/marshalling/marshallingCompleteAndValidInput.test.ts
---
import {expect, test} from 'vitest'
import {
    marshal<%= h.changeCase.pascal(relationshipName) %>Relationship
} from "../../../../../../src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

test('marshalling a complete and valid request', async () => {
    const relationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
        <%= h.changeCase.snake(startNodeType) %>_id: 1,
        <%= h.changeCase.snake(endNodeType) %>_id: 2,
        relationship_id: 3,
        relationship_name: "<%= h.changeCase.lower(relationshipName) %>",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const mappedNode = marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship)

    expect(mappedNode)
        .toStrictEqual({
            <%= h.changeCase.snake(startNodeType) %>_id: 1,
            <%= h.changeCase.snake(endNodeType) %>_id: 2,
            relationship_id: 3,
            relationship_name: "<%= h.changeCase.lower(relationshipName) %>",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
