import {InputPriceCreate} from "./types/InputPriceCreate"
import {PriceNode} from "./types/PriceNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputPriceCreate): Promise<PriceNode> {
    return await createNeo4jNode(DbNodeType.Price, data) as PriceNode
}
