import neo4j, {Driver} from "neo4j-driver"
import {getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Deletes the relationship when there actually exists one with the given id.
 * If not, nothing happens.
 * The attached nodes will NOT be deleted.
 *
 * Returns true when a relationship was deleted.
 * Returns return false when nothing was deleted.
 */
export async function deleteRelationshipById(relationshipId: number): Promise<boolean> {
    const driver: Driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const summary = await session.executeWrite(async txc => {
        const result = await txc.run(deleteRelationshipByIdQuery(relationshipId))
        return result.summary
    })

    await session.close()

    return summary.counters.updates().relationshipsDeleted > 0
}

export function deleteRelationshipByIdQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/deleteRelationshipById.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
