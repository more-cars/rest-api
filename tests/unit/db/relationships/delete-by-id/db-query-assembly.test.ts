import {expect, test} from 'vitest'
import {deleteRelationshipByIdQuery} from "../../../../../src/db/relationships/deleteRelationshipById"

test('database query for deleting a relationship by ID', async () => {
    const query = deleteRelationshipByIdQuery(12_123_456)

    expect(query)
        .toEqual(
            "MATCH ()-[r {mc_id: 12123456}]->()\n" +
            "DELETE r")
})
