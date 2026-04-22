import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    return await createNeo4jNode(DbNodeType.CarModel, data) as CarModelNode
}
