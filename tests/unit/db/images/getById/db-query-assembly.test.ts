import {expect, test} from 'vitest'
import {getNodeByIdQuery} from "../../../../../src/db/nodes/getNodeById"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get image by id" request', async () => {
    const query = getNodeByIdQuery(41, NodeTypeLabel.Image)

    expect(query)
        .toEqual(
            "MATCH (node:Image {mc_id: 41})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
