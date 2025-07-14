import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../../src/db/driver.ts"

export async function deleteBrandHasCarModelRelationships() {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (a:Brand)-[rel:HAS_CAR_MODEL]-(b:CarModel)
            DELETE rel
        `)
    })

    await session.close()
    await driver.close()
}
