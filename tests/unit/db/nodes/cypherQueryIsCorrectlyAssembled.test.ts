import {assembleCypherQuery} from "../../../../src/db/assembleCypherQuery"

test('cypher query is correctly assembled for "get node by id" request', async () => {
    const query = assembleCypherQuery(99)

    expect(query)
        .toEqual(
            "MATCH (node {mc_id: 99})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
