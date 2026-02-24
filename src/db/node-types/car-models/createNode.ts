import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertCarModelNeo4jNodeToDbNode} from "./convertCarModelNeo4jNodeToDbNode"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const node = await createNeo4jNode(DbNodeType.CarModel, data)

    return convertCarModelNeo4jNodeToDbNode(node)
}
