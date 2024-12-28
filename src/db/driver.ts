import neo4j, {Driver} from "neo4j-driver"

const URI = 'neo4j://10.96.196.165' // TODO needs to be determined dynamically
const USER = 'neo4j'
const PASSWORD = '123456789'

export function getDriver() {
    return neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
}

export async function closeDriver(driver: Driver) {
    await driver.close()
}
