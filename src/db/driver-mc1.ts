import neo4j from "neo4j-driver"

const USER = 'neo4j'
const PASSWORD = process.env.DB_MC1_PASSWORD as string

export function getMc1Driver() {
    return neo4j.driver(
        getDatabaseUrl(),
        neo4j.auth.basic(USER, PASSWORD),
        {disableLosslessIntegers: true} // see https://github.com/neo4j/neo4j-javascript-driver?tab=readme-ov-file#enabling-native-numbers
    )
}

function getDatabaseUrl() {
    if (!process.env.DB_MC1_HOST) {
        throw new Error('Missing database host')
    }

    return `bolt://${process.env.DB_MC1_HOST}`
}
