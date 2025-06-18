import {getAllNodesOfTypeQuery} from "../../../../../src/db/nodes/getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get all car models" request', async () => {
    const query = getAllNodesOfTypeQuery(NodeTypeLabel.CarModel)

    expect(query)
        .toEqual(
            "MATCH (node:CarModel)\n" +
            "RETURN node")
})
