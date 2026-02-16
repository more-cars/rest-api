import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    const node = await createDbNode(NodeTypeLabel.CarModelVariant, data)

    return mapDbNodeToCarModelVariantNode(node)
}
