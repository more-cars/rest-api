import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createNeo4jNode} from "../../nodes/createNeo4jNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertRacingSeriesNeo4jNodeToDbNode} from "./convertRacingSeriesNeo4jNodeToDbNode"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createNeo4jNode(DbNodeType.RacingSeries, data)

    return convertRacingSeriesNeo4jNodeToDbNode(node)
}
