import {InputMagazineCreate} from "./types/InputMagazineCreate"
import {MagazineNode} from "./types/MagazineNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputMagazineCreate): Promise<MagazineNode> {
    return await createNeo4jNode(DbNodeType.Magazine, data) as MagazineNode
}
