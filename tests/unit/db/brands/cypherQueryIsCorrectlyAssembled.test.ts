import {assembleCypherQuery} from "../../../../src/db/assembleCypherQuery"
import {NodeTypeLabel} from "../../../../src/db/NodeTypeLabel"

test('cypher query is correctly assembled for "get brand by id" request', async () => {
    const query = assembleCypherQuery(42, NodeTypeLabel.Brand)

    expect(query)
        .toEqual(
            "MATCH (node:Brand {mc_id: 42})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
