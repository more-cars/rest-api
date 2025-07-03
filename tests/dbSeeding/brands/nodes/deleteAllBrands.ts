import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../src/db/driver"

/**
 * Deletes all nodes from type "Brand" in the database.
 * All relationships that are connected to a "Brand" are deleted, too.
 */
export async function deleteAllBrands() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:Brand)
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
