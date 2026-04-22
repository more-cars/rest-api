import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    return await createNeo4jNode(DbNodeType.CarModelVariant, data) as CarModelVariantNode
}
