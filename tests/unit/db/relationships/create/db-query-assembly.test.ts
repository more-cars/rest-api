import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationshipQuery} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"

describe('Assembling database query for creating a relationship', () => {
    test.each(getAllDbRelationshipTypes())('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId, RelationshipDirection.FORWARD)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)-[r:" + relationshipName + "]->(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(getAllDbRelationshipTypes())('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId, RelationshipDirection.REVERSE)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)<-[r:" + relationshipName + "]-(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
