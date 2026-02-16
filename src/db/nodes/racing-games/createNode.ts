import {InputRacingGameCreate} from "./types/InputRacingGameCreate"
import {RacingGameNode} from "./types/RacingGameNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingGameNode} from "./mapDbNodeToRacingGameNode"

export async function createNode(data: InputRacingGameCreate): Promise<RacingGameNode> {
    const node = await createDbNode(NodeTypeLabel.RacingGame, data)

    return mapDbNodeToRacingGameNode(node)
}
