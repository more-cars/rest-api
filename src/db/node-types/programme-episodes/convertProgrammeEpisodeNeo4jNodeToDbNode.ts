import {Node} from "neo4j-driver"
import {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {DbNodeType} from "../../types/DbNodeType"
import {convertNeo4jPropertiesToDbProperties} from "../../nodes/convertNeo4jPropertiesToDbProperties"
import {NodeType} from "../../../specification/NodeType"

export function convertProgrammeEpisodeNeo4jNodeToDbNode(neo4jNode: Node): ProgrammeEpisodeNode {
    return {
        node_type: DbNodeType.ProgrammeEpisode,
        properties: convertNeo4jPropertiesToDbProperties(neo4jNode, NodeType.ProgrammeEpisode)
    } as ProgrammeEpisodeNode
}
