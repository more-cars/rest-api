import {InputPriceCreate} from "./types/InputPriceCreate"
import {PriceNode} from "./types/PriceNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertPriceNeo4jNodeToDbNode} from "./convertPriceNeo4jNodeToDbNode"

export async function createNode(data: InputPriceCreate): Promise<PriceNode> {
    const node = await createNeo4jNode(DbNodeType.Price, data)

    return convertPriceNeo4jNodeToDbNode(node)
}
