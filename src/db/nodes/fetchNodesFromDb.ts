import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"
import {getNodeTypeCollectionQuery} from "./getNodeTypeCollectionQuery"

export async function fetchNodesFromDb(nodeType: DbNodeType, params?: CollectionQueryParams): Promise<Node[]> {
    const defaultParams = {
        sortByProperty: 'mc_id',
        sortDirection: 'ASC',
        offset: 0,
        limit: 100,
    }
    const mergedParams = Object.assign({}, defaultParams, params)

    const nodes: Node[] = []

    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeTypeCollectionQuery(nodeType, mergedParams))
        return result.records
    })

    await session.close()

    records.forEach(record => {
        nodes.push(record.get('node'))
    })

    return nodes
}
