import {
    deleteRelationshipByNodeAndNameQuery
} from "../../../../../src/db/relationships/deleteRelationshipsByNodeAndType"
import {DbRelationship} from "../../../../../src/types/DbRelationship"

test('cypher query is correctly assembled for "delete relationship by node and name" request', async () => {
    const query = deleteRelationshipByNodeAndNameQuery(42, DbRelationship.BrandHasCarModel)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 42})-[r:HAS_CAR_MODEL]->()\n" +
            "DELETE r")
})
