---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/delete/nodesExistsButNoRelationship.test.ts
---
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when the relationship does not exist', async () => {
    const <%= h.changeCase.camel(startNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')
    const <%= h.changeCase.camel(endNodeType) %> = await seedNode('<%= h.changeCase.lower(endNodeType) %>')

    const relationship = await deleteSpecificRelationship(
        <%= h.changeCase.camel(startNodeType) %>.id,
        <%= h.changeCase.camel(endNodeType) %>.id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(relationship)
        .toBeFalsy()
})
