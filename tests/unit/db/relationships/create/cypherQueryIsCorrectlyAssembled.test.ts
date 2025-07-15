import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship.ts"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship.ts"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        41,
        DbRelationship.BrandHasCarModel,
        42)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 41}), (b {mc_id: 42})\n" +
            "CREATE (a)-[r:HAS_CAR_MODEL]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
