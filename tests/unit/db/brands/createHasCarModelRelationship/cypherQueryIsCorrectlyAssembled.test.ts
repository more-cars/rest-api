import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        12002007,
        DbRelationship.BrandHasCarModel,
        12002008)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002007}), (b {mc_id: 12002008})\n" +
            "CREATE (a)-[r:HAS_CAR_MODEL]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
