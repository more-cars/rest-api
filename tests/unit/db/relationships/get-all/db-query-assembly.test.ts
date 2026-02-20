import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipTypes} from "../../../../_toolbox/getAllDbRelationshipTypes"
import {RelationshipType} from "../../../../../src/db/types/RelationshipType"
import {getRelationshipCollectionQuery} from "../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {mapDbRelationshipTypeToNeo4jRelationshipType} from "../../../../../src/db/relationships/mapDbRelationshipTypeToNeo4jRelationshipType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('Assembling database query for fetching all relationships', () => {
    test.each(getAllDbRelationshipTypes())('forward $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType, RelationshipDirection.FORWARD, DbNodeType.LapTime)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b:LapTime_" + appInstanceId + ")\n" +
                "RETURN a, r, b")
    })

    test.each(getAllDbRelationshipTypes())('reverse $0 relationship', async (relationshipType: RelationshipType) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipType, RelationshipDirection.REVERSE, DbNodeType.LapTime)
        const relationshipName = mapDbRelationshipTypeToNeo4jRelationshipType(relationshipType)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b:LapTime_" + appInstanceId + ")\n" +
                "RETURN a, r, b")
    })
})
