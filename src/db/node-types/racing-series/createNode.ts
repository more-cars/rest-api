import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createNeo4jNode(DbNodeType.RacingSeries, data)

    return mapDbNodeToRacingSeriesNode(node)
}
