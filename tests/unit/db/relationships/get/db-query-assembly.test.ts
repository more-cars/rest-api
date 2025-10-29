import {expect, test} from 'vitest'
import {getAllRelationshipTypes} from "../../../../_toolbox/getAllRelationshipTypes"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipQuery} from "../../../../../src/db/relationships/getRelationship"

test('database query for fetching a relationship', async () => {
    getAllRelationshipTypes().forEach((relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipQuery(startNodeId, relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipType + "]-(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
