import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {getRelationshipQuery} from "../../../../../src/db/relationships/getRelationship"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('Assembling database query for fetching a relationship', () => {
    test.each(getAllDbRelationshipTypes(RelationshipDirection.FORWARD))('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipQuery(startNodeId, relationshipType, DbNodeType.LapTime)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b:LapTime_" + appInstanceId + ")\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(getAllDbRelationshipTypes(RelationshipDirection.REVERSE))('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipQuery(startNodeId, relationshipType, DbNodeType.LapTime)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b:LapTime_" + appInstanceId + ")\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
