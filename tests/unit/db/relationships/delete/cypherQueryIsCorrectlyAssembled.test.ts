import {deleteRelationshipQuery} from "../../../../../src/db/relationships/deleteRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = deleteRelationshipQuery(999)

    expect(query)
        .toEqual(
            "MATCH ()-[r {mc_id: 999}]->()\n" +
            "DELETE r")
})
