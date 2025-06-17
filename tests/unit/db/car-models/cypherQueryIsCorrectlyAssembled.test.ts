import {assembleCypherQuery} from "../../../../src/db/car-models/assembleCypherQuery"

test('cypher query is correctly assembled for "get car model by id" request', async () => {
    const query = assembleCypherQuery(40)

    expect(query)
        .toEqual(
            "MATCH (node:CarModel {mc_id: 40})\n" +
            "RETURN node\n" +
            "LIMIT 1")
})
