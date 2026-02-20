import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {deleteSpecificRelationshipQuery} from '../../../../../src/db/relationships/deleteSpecificRelationship'
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"

describe('Assembling database query for deleting a relationship', () => {
    test.each(getAllDbRelationshipTypes())('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = deleteSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId, RelationshipDirection.FORWARD)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b {mc_id: " + endNodeId + "})\n" +
                "DELETE r")
    })

    test.each(getAllDbRelationshipTypes())('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = deleteSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId, RelationshipDirection.REVERSE)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b {mc_id: " + endNodeId + "})\n" +
                "DELETE r")
    })
})
