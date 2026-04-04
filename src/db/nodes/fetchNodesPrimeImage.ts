import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import type {Relationship} from "../types/Relationship"
import {Relationship as Neo4jRelationship} from "neo4j-driver-core/types/graph-types"
import {convertNeo4jRelationshipToDbRelationship} from "../relationships/convertNeo4jRelationshipToDbRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodesPrimeImage(ids: number[]) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(fetchNodesPrimeImageQuery(ids))
        return result.records
    })

    await session.close()

    const relationships: Relationship[] = []

    records.forEach(record => {
        const startNode: Node = record.get('a')
        const dbRelationship: Neo4jRelationship = record.get('r')
        const endNode: Node = record.get('b')

        relationships.push(convertNeo4jRelationshipToDbRelationship(dbRelationship, startNode, endNode))
    })

    return relationships
}

export function fetchNodesPrimeImageQuery(ids: number[]) {
    return getCypherQueryTemplate('nodes/_cypher/getNodesPrimeImage.cypher')
        .trim()
        .replace('$nodeIds', ids.join(','))
}
