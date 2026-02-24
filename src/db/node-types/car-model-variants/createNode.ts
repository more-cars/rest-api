import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    const node = await createNeo4jNode(DbNodeType.CarModelVariant, data)

    return mapDbNodeToCarModelVariantNode(node)
}
