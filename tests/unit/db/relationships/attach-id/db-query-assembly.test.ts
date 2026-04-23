import {expect, test} from 'vitest'
import {addMoreCarsIdToRelationshipQuery} from "../../../../../src/db/relationships/addMoreCarsIdToRelationship"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('cypher query is correctly assembled for "add more cars id to relationship" request', async () => {
    const query = addMoreCarsIdToRelationshipQuery(
        42,
        12345678,
        RelationshipType.CompanyHasBrand,
        87654321)

    expect(query)
        .toEqual(
            `MATCH (a:Company_A_${appInstanceId} {mc_id: 12345678})-[r:HAS_BRAND]->(b:Brand_A_${appInstanceId} {mc_id: 87654321})\n` +
            "SET r.mc_id = 42\n" +
            "RETURN a, r, b\n" +
            "  LIMIT 1")
})
