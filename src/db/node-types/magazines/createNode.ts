import {InputMagazineCreate} from "./types/InputMagazineCreate"
import {MagazineNode} from "./types/MagazineNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertMagazineNeo4jNodeToDbNode} from "./convertMagazineNeo4jNodeToDbNode"

export async function createNode(data: InputMagazineCreate): Promise<MagazineNode> {
    const node = await createNeo4jNode(DbNodeType.Magazine, data)

    return convertMagazineNeo4jNodeToDbNode(node)
}
