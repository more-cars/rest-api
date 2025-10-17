import {expect, test} from 'vitest'
import {getAllRelationshipTypes} from "../../../../_toolbox/getAllRelationshipTypes"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"

test('database query for fetching a specific relationship', async () => {
    getAllRelationshipTypes().forEach((relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipType + "]-(b {mc_id: " + endNodeId + "})\n" +
                "RETURN r")
    })
})
