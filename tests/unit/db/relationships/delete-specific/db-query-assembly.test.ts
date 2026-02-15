import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipNames} from "../../../../_toolbox/getAllDbRelationshipNames"
import {DbRelationshipName} from "../../../../../src/db/types/DbRelationshipName"
import {deleteSpecificRelationshipQuery} from '../../../../../src/db/relationships/deleteSpecificRelationship'
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for deleting a relationship', () => {
    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: DbRelationshipName) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = deleteSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId, RelationshipDirection.FORWARD)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b {mc_id: " + endNodeId + "})\n" +
                "DELETE r")
    })

    test.each(getAllDbRelationshipNames())('reverse $0 relationship', async (relationshipName: DbRelationshipName) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = deleteSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + relationshipName + "]-(b {mc_id: " + endNodeId + "})\n" +
                "DELETE r")
    })
})
