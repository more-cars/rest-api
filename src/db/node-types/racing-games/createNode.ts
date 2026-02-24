import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    const node = await createNeo4jNode(DbNodeType.RacingGame, data)

    return mapDbNodeToRacingGameNode(node)
}
