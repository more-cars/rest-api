import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get all brands" request', async () => {
    const query = getAllNodesOfTypeQuery(NodeTypeLabel.Brand)

    expect(query)
        .toEqual(
            "MATCH (node:Brand)\n" +
            "RETURN node")
})
