import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship.ts"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        12003001,
        "BELONGS_TO_NODE",
        12003002)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12003001}), (b {mc_id: 12003002})\n" +
            "CREATE (a)-[r:BELONGS_TO_NODE]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
