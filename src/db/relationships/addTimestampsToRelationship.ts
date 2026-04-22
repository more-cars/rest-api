import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {Relationship} from "../types/Relationship"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "./convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function addTimestampsToRelationship(elementId: string, createdAt: string, updatedAt: string): Promise<Relationship> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const record = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(addTimestampsToRelationshipQuery(elementId, createdAt, updatedAt), txc)
            return result.records[0]
        })

        const startNode = record.get('a') as Node
        const neo4jRelationship = record.get('r') as Neo4jRelationship
        const endNode = record.get('b') as Node

        return convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode)
    } finally {
        await session.close()
    }
}

export function addTimestampsToRelationshipQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('relationships/_cypher/addTimestampsToRelationship.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
