import {createRelationshipQuery} from "../../../../../src/db/relationships/createRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        41,
        "HAS_CAR_MODEL",
        42)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 41}), (b {mc_id: 42})\n" +
            "CREATE (a)-[r:HAS_CAR_MODEL]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
