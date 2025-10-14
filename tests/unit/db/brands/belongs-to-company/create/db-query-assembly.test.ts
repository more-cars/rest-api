import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for creating a ›belongs-to-company‹ relationship', async () => {
    const query = createRelationshipQuery(
        12002002, // Brand
        DbRelationship.BrandBelongsToCompany,
        12002003) // Company

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002}), (b {mc_id: 12002003})\n" +
            "CREATE (a)-[r:BELONGS_TO_COMPANY]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
