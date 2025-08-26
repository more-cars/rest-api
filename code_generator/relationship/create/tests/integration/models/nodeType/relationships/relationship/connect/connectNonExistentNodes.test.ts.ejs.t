---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/connect/connectNonExistentNodes.test.ts
---
import {expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"

test('Expecting an error when any of the two nodes does not exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()
    const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

    const relationshipAttemptWithNonExistent<%= h.changeCase.pascal(startNodeType) %> =
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(endNodeType) %>.id)
    expect(relationshipAttemptWithNonExistent<%= h.changeCase.pascal(startNodeType) %>)
        .toBeFalsy()

    const relationshipAttemptWithNonExistent<%= h.changeCase.pascal(endNodeType) %> =
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, -43)
    expect(relationshipAttemptWithNonExistent<%= h.changeCase.pascal(endNodeType) %>)
        .toBeFalsy()

    const relationshipAttemptWithBothNodesNonExistent =
        await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(-44, -45)
    expect(relationshipAttemptWithBothNodesNonExistent)
        .toBeFalsy()
})
