import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../../src/db/driver"

export async function deleteAllRacingEvents() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (node:RacingEvent)
            DETACH DELETE node
        `)
    })

    await session.close()
    await driver.close()
}
