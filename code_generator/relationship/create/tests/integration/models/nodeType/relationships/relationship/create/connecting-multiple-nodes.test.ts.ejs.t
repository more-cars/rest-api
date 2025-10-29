---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/connecting-multiple-nodes.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

<% if (cardinality === '1:1' || cardinality === 'n:1') { -%>
test('A <%= h.changeCase.upper(startNodeType) %> cannot have multiple ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
<% } else if (cardinality === '1:n' || cardinality === 'm:n') { -%>
test('A <%= h.changeCase.upper(startNodeType) %> can have multiple ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
<% } -%>
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)
    const <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount = 3
    const <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %> = await seedNodes(NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>, <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount)

    for (const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> of <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>) {
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id)
    }

    const relationships = await getRelationshipCollection(<%= h.changeCase.camel(startNodeType) %>.id, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    expect(relationships.length)
<% if (cardinality === '1:1' || cardinality === 'n:1') { -%>
        .toBe(1)
<% } else if (cardinality === '1:n' || cardinality === 'm:n') { -%>
        .toBe(<%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount)
<% } -%>
})
