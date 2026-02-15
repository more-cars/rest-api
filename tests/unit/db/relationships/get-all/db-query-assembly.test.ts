import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipNames} from "../../../../_toolbox/getAllDbRelationshipNames"
import {DbRelationshipName} from "../../../../../src/db/types/DbRelationshipName"
import {getRelationshipCollectionQuery} from "../../../../../src/db/relationships/getRelationshipCollection"
import {NodeTypeLabel} from "../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for fetching all relationships', () => {
    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: DbRelationshipName) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipName, NodeTypeLabel.LapTime, RelationshipDirection.FORWARD)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b:" + NodeTypeLabel.LapTime + ")\n" +
                "RETURN a, r, b")
    })

    test.each(getAllDbRelationshipNames())('reverse $0 relationship', async (relationshipName: DbRelationshipName) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getRelationshipCollectionQuery(startNodeId, relationshipName, NodeTypeLabel.LapTime, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b:" + NodeTypeLabel.LapTime + ")\n" +
                "RETURN a, r, b")
    })
})
