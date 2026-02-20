import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    const node = await createDbNode(DbNodeType.RacingGame, data)

    return mapDbNodeToRacingGameNode(node)
}
