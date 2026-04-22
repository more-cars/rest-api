import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {Relationship} from "../types/Relationship"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationshipById(relationshipId: number): Promise<false | Relationship> {
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

        const startNode = records[0].get('a') as Node
        const neo4jRelationship = records[0].get('r') as Neo4jRelationship
        const endNode = records[0].get('b') as Node

        return convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode)
    } finally {
        await session.close()
    }
}

export function getRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
