---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSpecific/nodesAndRelationshipExist.test.ts
---
import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema} from "../../../../../../_toolbox/schemas/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema"

test('Both nodes and a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship exist', async () => {
    const expectedRelationship = await seedRelationship(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>, NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
    const actualRelationship = await <%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(expectedrelationship.start_node.properties.id, expectedRelationship.end_node.properties.id)

    expect(validateJson(actualRelationship, <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Schema))
        .toBeTruthy()

    expect(actualRelationship.origin.attributes.id)
        .toBe(expectedRelationship.start_node.properties.id)

    expect(actualRelationship.destination.attributes.id)
        .toBe(expectedRelationship.end_node.properties.id)
})
