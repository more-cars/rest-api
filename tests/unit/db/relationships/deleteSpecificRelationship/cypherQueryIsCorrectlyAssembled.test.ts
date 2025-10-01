import {expect, test} from 'vitest'
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {deleteSpecificRelationshipQuery} from '../../../../../src/db/relationships/deleteSpecificRelationship'

test('cypher query is correctly assembled for "delete specific relationship" request', async () => {
    const query = deleteSpecificRelationshipQuery(222, DbRelationship.CompanyHasImage, 444)

    expect(query)
        .toEqual(
            "MATCH (a {mc_id: 222})-[r:HAS_IMAGE]-(b {mc_id: 444})\n" +
            "DELETE r")
})
