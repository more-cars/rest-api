import neo4j, {Driver} from "neo4j-driver"

let driver: Driver | null = null

export function getDriver() {
    if (!driver) {
        const user = 'neo4j'
        const password = getDatabasePassword()
        const databaseUrl = getDatabaseUrl()

        driver = neo4j.driver(
            databaseUrl,
            neo4j.auth.basic(user, password),
            {disableLosslessIntegers: true} // see https://github.com/neo4j/neo4j-javascript-driver?tab=readme-ov-file#enabling-native-numbers
        )
    }

    return driver
}

function getDatabaseUrl() {
    if (!process.env.DB_HOST) {
        throw new Error('Missing database host')
    }

    return `neo4j://${process.env.DB_HOST}`
}

function getDatabasePassword() {
    if (!process.env.DB_PASSWORD) {
        throw new Error('Missing database password')
    }

    return process.env.DB_PASSWORD
}
