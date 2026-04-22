import neo4j from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteRelationshipById(relationshipId: number): Promise<boolean> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const summary = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(deleteRelationshipByIdQuery(relationshipId), txc)
            return result.summary
        })

        return summary.counters.updates().relationshipsDeleted > 0
    } finally {
        await session.close()
    }
}

export function deleteRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/deleteRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
