---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/has/nodesAndRelationshipExist.test.ts
---
import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema} from "../../../../../../_toolbox/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema"

test('Both nodes and the relationship exist', async () => {
    const expectedRelationship = await seedRelationship('<%= h.changeCase.lower(startNodeType) %>', '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
    const actualRelationship = await <%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(expectedRelationship.start_node_id, expectedRelationship.end_node_id)

    validateJson(actualRelationship, <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema)

    expect(actualRelationship.<%= h.changeCase.snake(startNodeType) %>_id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.<%= h.changeCase.snake(endNodeType) %>_id)
        .toBe(expectedRelationship.end_node_id)
})
