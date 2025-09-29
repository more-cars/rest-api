---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relationship/marshalling/marshallingCompleteAndValidInput.test.ts
---
import {expect, test} from 'vitest'
import {
    marshal<%= h.changeCase.pascal(relationshipName) %>Relationship
} from "../../../../../../src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

test('marshalled output for ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship when provided with complete and valid input data', async () => {
    const relationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
        <%= h.changeCase.snake(startNodeType) %>_id: 1,
        <%= h.changeCase.snake(endNodeType) %>_id: 2,
        relationship_id: 3,
        relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship)

    expect(marshalledData)
        .toStrictEqual({
            <%= h.changeCase.snake(startNodeType) %>_id: 1,
            <%= h.changeCase.snake(endNodeType) %>_id: 2,
            relationship_id: 3,
            relationship_name: "<%= h.changeCase.kebab(relationshipName) %>",
            created_at: "2023-10-01T00:00:00.001Z",
            updated_at: "2023-10-01T00:00:00.001Z",
        })
})
