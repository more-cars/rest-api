import {expect, test} from 'vitest'
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled', async () => {
    const query = getSpecificRelationshipQuery(
        12002002, // Car Model
        DbRelationship.CarModelHasPrimeImage,
        12002003, // Image
    )

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002})-[r:HAS_PRIME_IMAGE]-(b {mc_id: 12002003})\n" +
            "RETURN r")
})
