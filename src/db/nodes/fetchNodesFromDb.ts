import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import type {NodeTypeLabel} from "../NodeTypeLabel"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {DbFilterOperator} from "../types/DbFilterOperator"
import {getAllNodesOfTypeQuery} from "./getAllNodesOfTypeQuery"

export async function fetchNodesFromDb(nodeType: NodeTypeLabel, params: CollectionQueryParams = {
    sortByProperty: 'mc_id',
    sortDirection: 'ASC',
    filterByProperty: 'mc_id',
    filterValue: -1,
    filterOperator: DbFilterOperator.not_equal,
    offset: 0,
    limit: 100,
}): Promise<Array<Node>> {
    const nodes: Array<Node> = []

    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getAllNodesOfTypeQuery(nodeType, params))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach(record => {
        nodes.push(record.get('node'))
    })

    return nodes
}
