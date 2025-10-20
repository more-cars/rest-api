---
to: tests/integration/db/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/get-specific/nodesAndRelationshipExist.test.ts
---
import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Both nodes and the relationship exist', async () => {
    const expectedRelationship = await seedRelationship(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>, NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

    const actualRelationship = await getSpecificRelationship(
        expectedRelationship.start_node_id,
        expectedRelationship.end_node_id,
        DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
    )

    expect(actualRelationship)
        .toEqual(expectedRelationship)
})