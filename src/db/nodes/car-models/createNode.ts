import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {CarModelNode} from "./types/CarModelNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToCarModelNode} from "./mapDbNodeToCarModelNode"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const node = await createDbNode(Neo4jNodeType.CarModel, data)

    return mapDbNodeToCarModelNode(node)
}
