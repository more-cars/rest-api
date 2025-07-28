import {expect, test} from 'vitest'
import {createRelationshipQuery} from "../../../../../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"

test('cypher query is correctly assembled for "create relationship" request', async () => {
    const query = createRelationshipQuery(
        12002001,
        DbRelationship.NodeHasImage,
        12002002)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 12002001}), (b {mc_id: 12002002})\n" +
            "CREATE (a)-[r:HAS_IMAGE]->(b)\n" +
            "RETURN r\n" +
            "  LIMIT 1")
})
