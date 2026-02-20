import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationshipQuery} from "../../../../../src/db/relationships/createRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"

describe('Assembling database query for creating a relationship', () => {
    test.each(getAllDbRelationshipTypes(RelationshipDirection.FORWARD))('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)-[r:" + relationshipName + "]->(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(getAllDbRelationshipTypes(RelationshipDirection.REVERSE))('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)<-[r:" + relationshipName + "]-(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
