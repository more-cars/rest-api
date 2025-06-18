import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get all images" request', async () => {
    const query = getAllNodesOfTypeQuery(NodeTypeLabel.Image)

    expect(query)
        .toEqual(
            "MATCH (node:Image)\n" +
            "RETURN node")
})
