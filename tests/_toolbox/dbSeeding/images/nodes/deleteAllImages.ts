import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../../src/db/driver"

/**
 * Deletes all nodes from type "Image" in the database.
 * All relationships that are connected to an "Image" are deleted, too.
 */
export async function deleteAllImages() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:Image)
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
