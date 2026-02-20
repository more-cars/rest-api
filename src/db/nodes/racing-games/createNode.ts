import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    const node = await createDbNode(Neo4jNodeType.RacingGame, data)

    return mapDbNodeToRacingGameNode(node)
}
