import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const node = await createDbNode(NodeTypeLabel.CarModel, data)

    return mapDbNodeToCarModelNode(node)
}
