import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../../src/db/driver"

/**
 * Deletes all nodes from type "Car Model" in the database.
 * All relationships that are connected to a "Car Model" are deleted, too.
 */
export async function deleteAllCarModels() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:CarModel)
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
