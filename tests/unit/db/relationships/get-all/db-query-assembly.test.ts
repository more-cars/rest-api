import {expect, test} from 'vitest'
import {getAllRelationshipTypes} from "../../../../_toolbox/getAllRelationshipTypes"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipsForSpecificNodeQuery} from "../../../../../src/db/relationships/getRelationshipsForSpecificNode"

test('database query for fetching all relationships', async () => {
    getAllRelationshipTypes().forEach((relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipsForSpecificNodeQuery(startNodeId, relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipType + "]-(b)\n" +
                "RETURN r, b")
    })
})
