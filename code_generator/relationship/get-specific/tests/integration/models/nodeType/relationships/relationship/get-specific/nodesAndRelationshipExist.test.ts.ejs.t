---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSpecific/nodesAndRelationshipExist.test.ts
---
import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema} from "../../../../../../_toolbox/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema"

test('Both nodes and a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship exist', async () => {
    const expectedRelationship = await seedRelationship('<%= h.changeCase.lower(startNodeType) %>', '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
    const actualRelationship = await <%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(expectedRelationship.start_node_id, expectedRelationship.end_node_id)

    validateJson(actualRelationship, <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema)

    expect(actualRelationship.origin.id)
        .toBe(expectedRelationship.start_node_id)

    expect(actualRelationship.destination.id)
        .toBe(expectedRelationship.end_node_id)
})
