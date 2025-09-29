import {expect, test} from 'vitest'
import {getRelationshipForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipForSpecificNode"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "get sole relationship" request', async () => {
    const query = getRelationshipForSpecificNodeQuery(
        12002002, // Company
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_PRIME_IMAGE]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
