import {expect, test} from 'vitest'
import {
    getImageBelongsToNodeTypeRelationshipsQuery
} from "../../../../../src/db/nodes/images/getBelongsToNodeTypeRelationships"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get relationships per node type" request', async () => {
    let query = getImageBelongsToNodeTypeRelationshipsQuery(
        12002001,
        NodeTypeLabel.Brand,
    )
    expect(query)
        .toEqual(
            "MATCH (a:Image {mc_id: 12002001})-[r:HAS_IMAGE]-(b:Brand)\n" +
            "RETURN a, r, b")

    query = getImageBelongsToNodeTypeRelationshipsQuery(
        12002001,
        NodeTypeLabel.CarModel,
    )
    expect(query)
        .toEqual(
            "MATCH (a:Image {mc_id: 12002001})-[r:HAS_IMAGE]-(b:CarModel)\n" +
            "RETURN a, r, b")
})
