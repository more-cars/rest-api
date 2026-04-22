import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    return await createNeo4jNode(DbNodeType.RacingGame, data) as RacingGameNode
}
