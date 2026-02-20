import {InputRacingSeriesCreate} from "./types/InputRacingSeriesCreate"
import {RacingSeriesNode} from "./types/RacingSeriesNode"
import {createDbNode} from "../createDbNode"
import {Neo4jNodeType} from "../../types/Neo4jNodeType"
import {mapDbNodeToRacingSeriesNode} from "./mapDbNodeToRacingSeriesNode"

export async function createNode(data: InputRacingSeriesCreate): Promise<RacingSeriesNode> {
    const node = await createDbNode(Neo4jNodeType.RacingSeries, data)

    return mapDbNodeToRacingSeriesNode(node)
}
