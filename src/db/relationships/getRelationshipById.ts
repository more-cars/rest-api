import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationshipById(relationshipId: number) {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(getRelationshipByIdQuery(relationshipId), txc)
            return result.records
        })

        if (records.length === 0) {
            return false
        }

        const startNode: Node = records[0].get('a')
        const dbRelationship: Neo4jRelationship = records[0].get('r')
        const endNode: Node = records[0].get('b')

        return convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode)
    } finally {
        await session.close()
    }
}

export function getRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
