---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/connecting-multiple-nodes.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

<% if (cardinality === '1:1' || cardinality === 'n:1') { -%>
test('A <%= h.changeCase.upper(startNodeType) %> cannot have multiple ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
<% } else if (cardinality === '1:n' || cardinality === 'm:n') { -%>
test('A <%= h.changeCase.upper(startNodeType) %> can have multiple ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', async () => {
<% } -%>
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
    const <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount = 3
    const <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %> = await seedNodes(DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount)

    for (const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> of <%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>) {
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.properties.id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id)
    }

    const relationships = await getRelationshipCollection(<%= h.changeCase.camel(startNodeType) %>.properties.id, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    expect(relationships.length)
<% if (cardinality === '1:1' || cardinality === 'n:1') { -%>
        .toBe(1)
<% } else if (cardinality === '1:n' || cardinality === 'm:n') { -%>
        .toBe(<%= h.changeCase.camel(h.inflection.pluralize(startNodeType === endNodeType ? 'partner' : endNodeType)) %>Amount)
<% } -%>
})
