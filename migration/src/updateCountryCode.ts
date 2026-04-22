import neo4j from "neo4j-driver"
import {getDriver} from "../../src/db/driver"

export async function updateCountryCode(nodeId: number, countryCode: string, property?: string): Promise<boolean> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        return await session.executeWrite(async txc => {
            const result = await txc.run(updateCountryCodeQuery(nodeId, countryCode, property))
            return result.summary.counters.containsUpdates()
        })
    } finally {
        await session.close()
    }
}

function updateCountryCodeQuery(nodeId: number, countryCode: string, property?: string) {
    const countryCodeField = property ? property : 'country_code'

    return `MATCH (node {mc_id: ${nodeId}}) SET node.${countryCodeField} = "${countryCode}"`
}
