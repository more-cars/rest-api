import {expect, test} from 'vitest'
import {getNodeByIdQuery} from "../../../../../src/db/nodes/getNodeById"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "Get COMPANY by ID" request', async () => {
    const query = getNodeByIdQuery(42, NodeTypeLabel.Company)

    expect(query)
        .toEqual(
            "MATCH (node:Company {mc_id: 42})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
