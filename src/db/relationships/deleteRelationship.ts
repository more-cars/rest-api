import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Deletes the relationship when there actually exists one with the given id.
 * If not, nothing happens.
 * The attached nodes will NOT be deleted.
 *
 * Returns true when a relationship was deleted.
 * Returns return false when nothing was deleted.
 */
export async function deleteRelationship(relationshipId: number): Promise<boolean> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()
    const {summary} = await driver.executeQuery(deleteRelationshipQuery(relationshipId))
    await session.close()
    await closeDriver(driver)

    return summary.counters.updates().relationshipsDeleted > 0
}

export function deleteRelationshipQuery(relationshipId: number) {
    return getCypherQueryTemplate('relationships/_cypher/deleteRelationship.cypher')
        .trim()
        .replace('$relationshipId', relationshipId.toString())
}
