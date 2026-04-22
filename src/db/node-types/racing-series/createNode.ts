import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    return await createNeo4jNode(DbNodeType.RacingSeries, data) as RacingSeriesNode
}
