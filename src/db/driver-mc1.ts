import neo4j from "neo4j-driver"

const USER = 'neo4j'
const PASSWORD = process.env.DB_MC1_PASSWORD as string

export function getDriver() {
    return neo4j.driver(
        getDatabaseUrl(),
        neo4j.auth.basic(USER, PASSWORD),
    )
}

function getDatabaseUrl() {
    if (!process.env.DB_MC1_HOST) {
        throw new Error('Missing database host')
    }

    return `bolt://${process.env.DB_MC1_HOST}`
}
