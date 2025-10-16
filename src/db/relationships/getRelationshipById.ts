import neo4j, {Driver, type Node, type Relationship} from "neo4j-driver"
import {getDriver} from "../driver"
import type {BaseRelationship} from "../types/BaseRelationship"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getRelationshipById(relationshipId: number) {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipByIdQuery(relationshipId))
        return result.records
    })

    await session.close()
    await driver.close()

    if (records.length === 0) {
        return false
    }

    const startNode: Node = records[0].get('a')
    const relationship: Relationship = records[0].get('r')
    const endNode: Node = records[0].get('b')

    return {
        start_node_id: startNode.properties.mc_id,
        end_node_id: endNode.properties.mc_id,
        relationship_id: relationship.properties.mc_id,
        relationship_name: 'DUMMY', // TODO
        created_at: relationship.properties.created_at,
        updated_at: relationship.properties.updated_at,
    } as BaseRelationship
}

export function getRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/getRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
