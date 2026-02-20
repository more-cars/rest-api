---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/connecting-nodes-with-valid-data.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship with valid data', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>)

    const createdRelationship = await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(<%= h.changeCase.camel(startNodeType) %>.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
