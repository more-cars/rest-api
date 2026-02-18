import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipNames} from "../../../../_toolbox/getAllDbRelationshipNames"
import {RelationshipTypeNeo4j} from "../../../../../src/db/types/RelationshipTypeNeo4j"
import {getSpecificRelationshipQuery} from "../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for fetching a specific relationship', () => {
    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getSpecificRelationshipQuery(startNodeId, relationshipName, endNodeId, RelationshipDirection.FORWARD)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})-[r:" + relationshipName + "]->(b {mc_id: " + endNodeId + "})\n" +
                "RETURN a, r, b")
    })

    test.each(getAllDbRelationshipNames())('reverse $0 relationship', async (dbRelationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = getSpecificRelationshipQuery(startNodeId, dbRelationshipName, endNodeId, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "})<-[r:" + dbRelationshipName + "]-(b {mc_id: " + endNodeId + "})\n" +
                "RETURN a, r, b")
    })
})
