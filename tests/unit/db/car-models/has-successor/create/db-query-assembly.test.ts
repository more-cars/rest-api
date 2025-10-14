import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"

test('assembled database query for creating a ›has-successor‹ relationship', async () => {
    const query = createRelationshipQuery(
        12002002, // Car Model 1
        DbRelationship.CarModelHasSuccessor,
        12002003) // Car Model 2

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002002}), (b {mc_id: 12002003})\n" +
            "CREATE (a)-[r:HAS_SUCCESSOR]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
