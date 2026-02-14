import {describe, expect, test} from 'vitest'
import {getAllRelationshipTypes} from "../../../../_toolbox/getAllRelationshipTypes"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipQuery} from "../../../../../src/db/relationships/getRelationship"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for fetching a relationship', () => {
    test.each(getAllRelationshipTypes())('forward $0 relationship', async (relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipQuery(startNodeId, relationshipType, NodeTypeLabel.LapTime)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipType + "]->(b:LapTime)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(getAllRelationshipTypes())('reverse $0 relationship', async (relationshipType: DbRelationship) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipQuery(startNodeId, relationshipType, NodeTypeLabel.LapTime, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipType + "]-(b:LapTime)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
