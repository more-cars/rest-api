import ManagedTransaction from "neo4j-driver-core/types/transaction-managed"

export async function runNeo4jQuery(query: string, txc: ManagedTransaction) {
    return txc.run(query)
}
