import {assembleCypherQuery} from "../../../../src/db/brands/assembleCypherQuery"

test('cypher query is correctly assembled for "get brand by id" request', async () => {
    const query = assembleCypherQuery(42)

    expect(query)
        .toEqual(
            "MATCH (node:Brand {mc_id: 42})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
