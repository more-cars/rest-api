import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createDbNode} from "../createDbNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createDbNode(NodeTypeLabel.RacingSeries, data)

    return mapDbNodeToRacingSeriesNode(node)
}
