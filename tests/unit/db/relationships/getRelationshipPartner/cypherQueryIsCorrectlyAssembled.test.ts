import {DbRelationship} from "../../../../../src/types/DbRelationship"
import {getRelationshipForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipForSpecificNode"

test('cypher query is correctly assembled for "get relationship for specific node" request', async () => {
    const query = getRelationshipForSpecificNodeQuery(55, DbRelationship.BrandHasCarModel)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 55})-[r:HAS_CAR_MODEL]-(b)\n" +
            "RETURN r, b\n" +
            "  LIMIT 1")
})
