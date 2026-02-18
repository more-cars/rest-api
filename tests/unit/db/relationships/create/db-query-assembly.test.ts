import {describe, expect, test} from 'vitest'
import {getAllDbRelationshipNames} from "../../../../_toolbox/getAllDbRelationshipNames"
import {RelationshipTypeNeo4j} from "../../../../../src/db/types/RelationshipTypeNeo4j"
import {createRelationshipQuery} from "../../../../../src/db/relationships/createRelationship"
import {RelationshipDirection} from "../../../../../src/db/types/RelationshipDirection"

describe('Assembling database query for creating a relationship', () => {
    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipName, endNodeId, RelationshipDirection.FORWARD)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)-[r:" + relationshipName + "]->(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })

    test.each(getAllDbRelationshipNames())('forward $0 relationship', async (relationshipName: RelationshipTypeNeo4j) => {
        const startNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const endNodeId = Math.floor((Math.random() * 1_000_000) + 12_000_000)
        const query = createRelationshipQuery(startNodeId, relationshipName, endNodeId, RelationshipDirection.REVERSE)

        expect(query)
            .toEqual(
                "MATCH (a {mc_id: " + startNodeId + "}), (b {mc_id: " + endNodeId + "})\n" +
                "CREATE (a)<-[r:" + relationshipName + "]-(b)\n" +
                "RETURN a, r, b\n" +
                "  LIMIT 1")
    })
})
