import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('assembled database query for creating a ›has-brand‹ relationship', async () => {
    const query = createRelationshipQuery(
        12002002, // Company
        DbRelationship.CompanyHasBrand,
        12002003) // Brand

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002}), (b {mc_id: 12002003})\n" +
            "CREATE (a)-[r:HAS_BRAND]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
