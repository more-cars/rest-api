---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSpecific/nodesExistsButNoRelationship.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)
    const <%= h.changeCase.camel(endNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>)

    await expect(<%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
