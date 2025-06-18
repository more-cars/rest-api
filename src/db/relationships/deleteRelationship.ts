import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"

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

    const result = await deleteRel(relationshipId, driver)

    await session.close()
    await closeDriver(driver)

    return result
}

async function deleteRel(relationshipId: number, driver: Driver): Promise<boolean> {
    const {summary} = await driver.executeQuery(`
            MATCH ()-[r {mc_id: ${relationshipId}}]->()
            DELETE r`,
    )

    return summary.counters.updates().relationshipsDeleted > 0
}
