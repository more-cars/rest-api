import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {createRelationshipQuery} from "../../../../../src/db/relationships/createRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../../src/specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToRelationshipType} from "../../../../../src/specification/mapDbRelationshipTypeToRelationshipType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"
import {mapNodeTypeToDbNodeType} from "../../../../../src/specification/mapNodeTypeToDbNodeType"

describe('Assembling database query for creating a relationship', () => {
    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.FORWARD)
    )('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)

        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId, 'Dummy')

        expect(query)
            .toEqual(
                `MATCH (a${startNodeType ? `:${startNodeType}_A_${appInstanceId}` : ''} {mc_id: ${startNodeId}}), (b:${endNodeType}_A_${appInstanceId} {mc_id: ${endNodeId}})\n` +
                `CREATE (a)-[r:${relationshipName} {created_at: 'Dummy', updated_at: 'Dummy'}]->(b)\n` +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.REVERSE)
    )('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)

        const query = createRelationshipQuery(startNodeId, relationshipType, endNodeId, 'Dummy')

        expect(query)
            .toEqual(
                `MATCH (a:${startNodeType}_A_${appInstanceId} {mc_id: ${startNodeId}}), (b${endNodeType ? `:${endNodeType}_A_${appInstanceId}` : ''} {mc_id: ${endNodeId}})\n` +
                `CREATE (a)<-[r:${relationshipName} {created_at: 'Dummy', updated_at: 'Dummy'}]-(b)\n` +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
