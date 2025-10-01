import {expect, test} from 'vitest'
import {deleteRelationshipByIdQuery} from "../../../../../src/db/relationships/deleteRelationshipById"

test('cypher query is correctly assembled for "delete relationship by ID" request', async () => {
    const query = deleteRelationshipByIdQuery(123)

    expect(query)
        .toEqual(
            "MATCH ()-[r {mc_id: 123}]->()\n" +
            "DELETE r")
})
