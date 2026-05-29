import neo4j, {Node, Relationship as Neo4jRelationship} from "neo4j-driver"
import type {Relationship} from "../types/Relationship"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jRelationshipToDbRelationship} from "../relationships/convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodesPrimeImage(ids: number[]): Promise<Map<number, Relationship | undefined>> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(fetchNodesPrimeImageQuery(ids), txc)
            return result.records
        })

        const relationships = new Map<number, Relationship | undefined>
        ids.forEach(id => {
            relationships.set(id, undefined)
        })

        records.forEach(record => {
            const startNode = record.get('a') as Node
            const neo4jRelationship = record.get('r') as Neo4jRelationship
            const endNode = record.get('b') as Node

            relationships.set(startNode.properties.mc_id, convertNeo4jRelationshipToDbRelationship(neo4jRelationship, startNode, endNode))
        })

        return relationships
    } finally {
        await session.close()
    }
}

export function fetchNodesPrimeImageQuery(ids: number[]) {
    return getCypherQueryTemplate('nodes/_cypher/getNodesPrimeImage.cypher')
        .trim()
        .replace('$nodeIds', ids.join(','))
}
