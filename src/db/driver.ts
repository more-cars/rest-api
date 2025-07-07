import neo4j from "neo4j-driver"

export function getDriver() {
    const user = 'neo4j'
    const password = getDatabasePassword()
    const databaseUrl = getDatabaseUrl()

    return neo4j.driver(
        databaseUrl,
        neo4j.auth.basic(user, password),
        {disableLosslessIntegers: true} // see https://github.com/neo4j/neo4j-javascript-driver?tab=readme-ov-file#enabling-native-numbers
    )
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
