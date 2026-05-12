import {Node} from "neo4j-driver"
import {RaceTrackNode} from "./types/RaceTrackNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertRaceTrackNeo4jNodeToDbNode(neo4jNode: Node): RaceTrackNode {
    return {
        node_type: DbNodeType.RaceTrack,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.RaceTrack)
    } as RaceTrackNode
}
