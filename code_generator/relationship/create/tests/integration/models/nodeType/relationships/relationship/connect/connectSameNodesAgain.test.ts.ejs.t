---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectSameNodesAgain.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"

test('The relationship ID should not change when creating the same relationship again', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

    const relationshipBefore =
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id)
    expect(relationshipBefore)
        .not.toBe(false)

    const relationshipAfter =
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id)
    expect(relationshipAfter)
        .not.toBe(false)

    if (relationshipAfter && relationshipBefore) {
        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    }
})
