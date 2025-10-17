import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        12003001, // Brand
        DbRelationship.NodeHasImage,
        12003002) // Image

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12003001}), (b {mc_id: 12003002})\n" +
            "CREATE (a)-[r:HAS_IMAGE]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
