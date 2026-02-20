import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createDbNode} from "../createDbNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createDbNode(DbNodeType.RacingSeries, data)

    return mapDbNodeToRacingSeriesNode(node)
}
