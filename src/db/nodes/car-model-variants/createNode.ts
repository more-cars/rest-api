import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    const node = await createDbNode(DbNodeType.CarModelVariant, data)

    return mapDbNodeToCarModelVariantNode(node)
}
