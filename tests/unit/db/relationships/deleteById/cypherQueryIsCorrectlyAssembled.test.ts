import {expect, test} from 'vitest'
import {deleteRelationshipByIdQuery} from "../../../../../src/db/relationships/deleteRelationshipById"

test('cypher query is correctly assembled for "delete relationship by id" request', async () => {
    const query = deleteRelationshipByIdQuery(999)

    expect(query)
        .toEqual(
            "MATCH ()-[r {mc_id: 999}]->()\n" +
            "DELETE r")
})
