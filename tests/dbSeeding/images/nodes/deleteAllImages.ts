import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../../../src/db/driver"

/**
 * Deletes all nodes from type "Image" in the database.
 * Deletion is exercised directly in the database via a Cypher query.
 */
export async function deleteAllImages() {
    const driver: Driver = getDriver()
    const session: Session = driver.session()
    await driver.executeQuery(`
        MATCH (node:Image) 
        DETACH DELETE node
    `)
    await session.close()
    await closeDriver(driver)
}
