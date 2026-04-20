import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {getRelationshipCollectionQuery} from "../../../../../src/db/relationships/getRelationshipCollection"
import {getRelationshipTypeSpecification} from "../../../../../src/specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToRelationshipType} from "../../../../../src/specification/mapDbRelationshipTypeToRelationshipType"
import {mapNodeTypeToDbNodeType} from "../../../../../src/specification/mapNodeTypeToDbNodeType"
import {getNamespacedNodeTypeLabel} from "../../../../../src/db/getNamespacedNodeTypeLabel"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Assembling database query for fetching all relationships', () => {
    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.FORWARD)
    )('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType)

        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const startNodeLabel = getNamespacedNodeTypeLabel(startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeLabel = getNamespacedNodeTypeLabel(endNodeType)

        if (startNodeType === DbNodeType.Node) {
            expect(query)
                .toEqual(
                    `MATCH (a {mc_id: ${startNodeId}})-[r:${relationshipName}]->(b:${endNodeLabel})\n` +
                    "RETURN a, r, b")
        } else {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})-[r:${relationshipName}]->(b:${endNodeLabel})\n` +
                    "RETURN a, r, b")
        }
    })

    test.each(
        getAllDbRelationshipTypes(RelationshipDirection.REVERSE)
    )('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType)

        const relationshipSpecs = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
        const startNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.startNodeType)
        const startNodeLabel = getNamespacedNodeTypeLabel(startNodeType)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)
        const endNodeType = mapNodeTypeToDbNodeType(relationshipSpecs.endNodeType)
        const endNodeLabel = getNamespacedNodeTypeLabel(endNodeType)

        if (endNodeType === DbNodeType.Node) {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})<-[r:${relationshipName}]-(b)\n` +
                    "RETURN a, r, b")
        } else {
            expect(query)
                .toEqual(
                    `MATCH (a:${startNodeLabel} {mc_id: ${startNodeId}})<-[r:${relationshipName}]-(b:${endNodeLabel})\n` +
                    "RETURN a, r, b")
        }
    })
})
