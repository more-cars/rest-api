import {expect, test} from 'vitest'
import {getRelationshipByIdQuery} from "../../../../../src/db/relationships/getRelationshipById"

test('assembled database query for fetching a relationship by ID', async () => {
    const query = getRelationshipByIdQuery(123)

    expect(query)
        .toEqual(
            "MATCH (a)-[r {mc_id: 123}]->(b)\n" +
            "RETURN a, r, b")
})
