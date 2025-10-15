---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.kebab(relationshipName) %>/marshalling-relationship.test.ts
---
import {expect, test} from 'vitest'
import Fake<%= h.changeCase.pascal(endNodeType) %> from "../../../../_toolbox/fixtures/nodes/Fake<%= h.changeCase.pascal(endNodeType) %>"
import type {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"
import {marshalRelationship} from "../../../../../src/controllers/relationships/marshalRelationship"
import type {BaseRelationship} from "../../../../../src/controllers/relationships/types/BaseRelationship"

test('marshalled output for ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship when provided with complete and valid input data', async () => {
    const partnerNode = Object.assign({}, Fake<%= h.changeCase.pascal(endNodeType) %>, {
        id: 2,
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    })

    const relationship: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship = {
        <%= h.changeCase.snake(startNodeType) %>_id: 1,
        <%= h.changeCase.snake(startNodeType === endNodeType ? 'partner' : endNodeType) %>_id: 2,
        relationship_id: 3,
        relationship_name: "<%= h.changeCase.constant(relationshipName) %>",
        created_at: "2023-10-01T00:00:00.001Z",
        updated_at: "2023-10-01T00:00:00.001Z",
    }

    const marshalledData = marshalRelationship(relationship as BaseRelationship, partnerNode, "<%= h.changeCase.lower(endNodeType) %>")

    expect(marshalledData)
        .toStrictEqual({
            data: {
                relationship_id: 3,
                relationship_name: "<%= h.changeCase.kebab(relationshipName) %>",
                relationship_partner: {
                    node_type: "<%= h.changeCase.kebab(endNodeType) %>",
                    data: partnerNode,
                },
                created_at: "2023-10-01T00:00:00.001Z",
                updated_at: "2023-10-01T00:00:00.001Z",
            }
        })
})
