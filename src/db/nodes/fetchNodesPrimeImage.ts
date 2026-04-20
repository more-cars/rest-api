import neo4j, {Node} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import type {Relationship} from "../types/Relationship"
import {Relationship as Neo4jRelationship} from "neo4j-driver-core/types/graph-types"
import {convertNeo4jRelationshipToDbRelationship} from "../relationships/convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodesPrimeImage(ids: number[]) {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(fetchNodesPrimeImageQuery(ids), txc)
            return result.records
        })

        const relationships: Relationship[] = []

        records.forEach(record => {
            const startNode: Node = record.get('a')
            const dbRelationship: Neo4jRelationship = record.get('r')
            const endNode: Node = record.get('b')

            relationships.push(convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode))
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
