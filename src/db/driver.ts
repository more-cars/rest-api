import neo4j, {Driver} from "neo4j-driver"

const USER = 'neo4j'
const PASSWORD = '123456789'

export function getDriver() {
    return neo4j.driver(
        getDatabaseUrl(),
        neo4j.auth.basic(USER, PASSWORD),
        {disableLosslessIntegers: true} // see https://github.com/neo4j/neo4j-javascript-driver?tab=readme-ov-file#enabling-native-numbers
    )
}

export async function closeDriver(driver: Driver) {
    await driver.close()
}

function getDatabaseUrl() {
    if (!process.env.DB_HOST) {
        throw new Error('Missing database host')
    }

    return `neo4j://${process.env.DB_HOST}`
}
