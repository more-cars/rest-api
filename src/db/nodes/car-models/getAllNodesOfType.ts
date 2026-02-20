import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import {CarModelNode} from "./types/CarModelNode"
import {getDbQueryCollectionParams} from "../getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<CarModelNode[]> {
    const nodes: CarModelNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.CarModel, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToCarModelNode(dbNode))
    })

    return nodes
}
