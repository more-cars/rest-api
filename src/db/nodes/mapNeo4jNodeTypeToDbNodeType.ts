import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {DbNodeType} from "../types/DbNodeType"
import {NodeTypeNotFoundError} from "../types/NodeTypeNotFoundError"

export function mapNeo4jNodeTypeToDbNodeType(nodeTypeLabel: Neo4jNodeType): DbNodeType {
    const mapping = new Map<Neo4jNodeType, DbNodeType>([
        [Neo4jNodeType.Company, DbNodeType.Company],
        [Neo4jNodeType.Brand, DbNodeType.Brand],
        [Neo4jNodeType.CarModel, DbNodeType.CarModel],
        [Neo4jNodeType.CarModelVariant, DbNodeType.CarModelVariant],
        [Neo4jNodeType.RaceTrack, DbNodeType.RaceTrack],
        [Neo4jNodeType.TrackLayout, DbNodeType.TrackLayout],
        [Neo4jNodeType.RacingSeries, DbNodeType.RacingSeries],
        [Neo4jNodeType.RacingEvent, DbNodeType.RacingEvent],
        [Neo4jNodeType.RacingSession, DbNodeType.RacingSession],
        [Neo4jNodeType.SessionResult, DbNodeType.SessionResult],
        [Neo4jNodeType.LapTime, DbNodeType.LapTime],
        [Neo4jNodeType.RacingGame, DbNodeType.RacingGame],
        [Neo4jNodeType.GamingPlatform, DbNodeType.GamingPlatform],
        [Neo4jNodeType.Image, DbNodeType.Image],
        [Neo4jNodeType.Node, DbNodeType.Node],
    ])

    const mappedNodeType = mapping.get(nodeTypeLabel)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeNotFoundError(nodeTypeLabel)
    }

    return mappedNodeType
}
