import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"
import {getRelationshipTypeSpecification} from "../../../../../src/specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToRelationshipType} from "../../../../../src/specification/mapDbRelationshipTypeToRelationshipType"
import {mapNodeTypeToDbNodeType} from "../../../../../src/specification/mapNodeTypeToDbNodeType"
import {getNamespacedNodeTypeLabel} from "../../../../../src/db/getNamespacedNodeTypeLabel"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Assembling database query for fetching a specific relationship', () => {
    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.FORWARD)
    )('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId)

        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const startNodeLabel = getNamespacedNodeTypeLabel(startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeLabel = getNamespacedNodeTypeLabel(endNodeType)

        if (startNodeType === DbNodeType.Node) {
            expect(query)
                .toEqual(
                    `MATCH (a {mc_id: ${startNodeId}})-[r:${relationshipName}]->(b:${endNodeLabel} {mc_id: ${endNodeId}})\n` +
                    "RETURN a, r, b")
        } else {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})-[r:${relationshipName}]->(b:${endNodeLabel} {mc_id: ${endNodeId}})\n` +
                    "RETURN a, r, b")
        }
    })

    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.REVERSE)
    )('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getSpecificRelationshipQuery(startNodeId, relationshipType, endNodeId)

        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const startNodeLabel = getNamespacedNodeTypeLabel(startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeLabel = getNamespacedNodeTypeLabel(endNodeType)

        if (endNodeType === DbNodeType.Node) {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})<-[r:${relationshipName}]-(b {mc_id: ${endNodeId}})\n` +
                    "RETURN a, r, b")
        } else {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})<-[r:${relationshipName}]-(b:${endNodeLabel} {mc_id: ${endNodeId}})\n` +
                    "RETURN a, r, b")
        }
    })
})
