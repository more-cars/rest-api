---
to: tests/integration/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/has/nodesDontExist.test.ts
---
import {expect, test} from 'vitest'
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Expecting an empty list when one of the nodes does not exist', async () => {
    const relationship = await getSpecificRelationship(
        -42,
        -43,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(relationship)
        .toBeFalsy()
})