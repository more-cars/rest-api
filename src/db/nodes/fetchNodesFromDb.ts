import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import type {Neo4jNodeType} from "../types/Neo4jNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {DbFilterOperator} from "../types/DbFilterOperator"
import {getAllNodesOfTypeQuery} from "./getAllNodesOfTypeQuery"

export async function fetchNodesFromDb(nodeType: Neo4jNodeType, params: CollectionQueryParams = {
    sortByProperty: 'mc_id',
    sortDirection: 'ASC',
    filterByProperty: 'mc_id',
    filterValue: -1,
    filterOperator: DbFilterOperator.not_equal,
    offset: 0,
    limit: 100,
}): Promise<Node[]> {
    const nodes: Node[] = []

    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getAllNodesOfTypeQuery(nodeType, params))
        return result.records
    })

    await session.close()

    records.forEach(record => {
        nodes.push(record.get('node'))
    })

    return nodes
}
