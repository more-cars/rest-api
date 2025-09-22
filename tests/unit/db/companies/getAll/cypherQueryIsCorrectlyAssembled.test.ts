import {expect, test} from 'vitest'
import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "Get all COMPANIES" request', async () => {
    const query = getAllNodesOfTypeQuery(NodeTypeLabel.Company)

    expect(query)
        .toEqual(
            "MATCH (node:Company)\n" +
            "RETURN node")
})
