import {expect, test} from 'vitest'
import {deleteNodeQuery} from "../../../../../src/db/nodes/deleteNode"

test('cypher query is correctly assembled for "delete Image" request', async () => {
    const query = deleteNodeQuery(41)

    expect(query)
        .toEqual(
            "MATCH (node {mc_id: 41})\n" +
            "DETACH DELETE node")
})
