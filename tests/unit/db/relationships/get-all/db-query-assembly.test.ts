import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipNames} from "../../../../_toolbox/getAllDbRelationshipNames"
import {RelationshipTypeNeo4j} from "../../../../../src/db/types/RelationshipTypeNeo4j"
import {getRelationshipCollectionQuery} from "../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

describe('Assembling database query for fetching all relationships', () => {
    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipName, RelationshipDirection.FORWARD, NodeTypeLabel.LapTime)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b:" + NodeTypeLabel.LapTime + "_" + appInstanceId + ")\n" +
                "RETURN a, r, b")
    })

    test.each(getAllDbRelationshipNames())('reverse $0 relationship', async (relationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipName, RelationshipDirection.REVERSE, NodeTypeLabel.LapTime)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b:" + NodeTypeLabel.LapTime + "_" + appInstanceId + ")\n" +
                "RETURN a, r, b")
    })
})
