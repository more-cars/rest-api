import {assembleCypherQuery} from "../../../../src/db/images/assembleCypherQuery"

test('cypher query is correctly assembled for "get image by id" request', async () => {
    const query = assembleCypherQuery(41)

    expect(query)
        .toEqual(
            "MATCH (node:Image {mc_id: 41})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
