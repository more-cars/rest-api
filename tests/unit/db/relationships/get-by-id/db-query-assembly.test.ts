import {expect, test} from 'vitest'
import {getRelationshipByIdQuery} from "../../../../../src/db/relationships/getRelationshipById"

test('database query for fetching a relationship by ID', async () => {
    const query = getRelationshipByIdQuery(12_123_456)

    expect(query)
        .toEqual(
            "MATCH (a)-[r {mc_id: 12123456}]->(b)\n" +
            "RETURN a, r, b")
})
