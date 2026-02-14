import {describe, expect, test} from 'vitest'
import {getAllRelationshipTypes} from "../../../../_toolbox/getAllRelationshipTypes"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipCollectionQuery} from "../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for fetching all relationships', () => {
    test.each(getAllRelationshipTypes())('forward $0 relationship', async (relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType, NodeTypeLabel.LapTime, RelationshipDirection.FORWARD)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipType + "]->(b:" + NodeTypeLabel.LapTime + ")\n" +
                "RETURN a, r, b")
    })

    test.each(getAllRelationshipTypes())('reverse $0 relationship', async (relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType, NodeTypeLabel.LapTime, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipType + "]-(b:" + NodeTypeLabel.LapTime + ")\n" +
                "RETURN a, r, b")
    })
})
