import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"
import type {MagazineNode} from "./types/MagazineNode"
import {getDbQueryCollectionParams} from "../../nodes/getDbQueryCollectionParams"
import {fetchNodesFromDb} from "../../nodes/fetchNodesFromDb"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMagazineNeo4jNodeToDbNode} from "./convertMagazineNeo4jNodeToDbNode"

export async function getAllNodesOfType(constraints: NodeCollectionConstraints = {}): Promise<MagazineNode[]> {
    const nodes: MagazineNode[] = []
    const dbParams = getDbQueryCollectionParams(constraints)
    const dbNodes = await fetchNodesFromDb(DbNodeType.Magazine, dbParams)

    dbNodes.forEach((dbNode) => {
        nodes.push(convertMagazineNeo4jNodeToDbNode(dbNode))
    })

    return nodes
}
