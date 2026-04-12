import neo4j, {type Driver, type Session} from "neo4j-driver"
import {getDriver} from "../../src/db/driver"

export async function updateCountryCode(nodeId: number, countryCode: string, property?: string) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const result = await session.executeWrite(async txc => {
        const result = await txc.run(updateCountryCodeQuery(nodeId, countryCode, property))
        return result.summary.counters.containsUpdates()
    })

    await session.close()

    return result
}

function updateCountryCodeQuery(nodeId: number, countryCode: string, property?: string) {
    const countryCodeField = property ? property : 'country_code'

    return `MATCH (node {mc_id: ${nodeId}}) SET node.${countryCodeField} = "${countryCode}"`
}
