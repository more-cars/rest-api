import {InputCarModelVariantCreate} from "./types/InputCarModelVariantCreate"
import {CarModelVariantNode} from "./types/CarModelVariantNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToCarModelVariantNode} from "./mapDbNodeToCarModelVariantNode"

export async function createNode(data: InputCarModelVariantCreate): Promise<CarModelVariantNode> {
    const node = await createDbNode(Neo4jNodeType.CarModelVariant, data)

    return mapDbNodeToCarModelVariantNode(node)
}
