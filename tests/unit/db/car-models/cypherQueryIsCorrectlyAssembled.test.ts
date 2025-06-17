import {getNodeByIdQuery} from "../../../../src/db/getNodeByIdQuery"
import {NodeTypeLabel} from "../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get car model by id" request', async () => {
    const query = getNodeByIdQuery(40, NodeTypeLabel.CarModel)

    expect(query)
        .toEqual(
            "MATCH (node:CarModel {mc_id: 40})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
