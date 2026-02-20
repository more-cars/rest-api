import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const node = await createDbNode(DbNodeType.CarModel, data)

    return mapDbNodeToCarModelNode(node)
}
