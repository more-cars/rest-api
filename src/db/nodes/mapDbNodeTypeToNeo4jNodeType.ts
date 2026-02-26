import {DbNodeType} from "../types/DbNodeType"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {NodeTypeNotFoundError} from "../types/NodeTypeNotFoundError"

export function mapDbNodeTypeToNeo4jNodeType(nodeTypeLabel: DbNodeType): Neo4jNodeType {
    const mapping = new Map<DbNodeType, Neo4jNodeType>([
        [DbNodeType.Company, Neo4jNodeType.Company],
        [DbNodeType.Brand, Neo4jNodeType.Brand],
        [DbNodeType.CarModel, Neo4jNodeType.CarModel],
        [DbNodeType.CarModelVariant, Neo4jNodeType.CarModelVariant],
        [DbNodeType.RaceTrack, Neo4jNodeType.RaceTrack],
        [DbNodeType.TrackLayout, Neo4jNodeType.TrackLayout],
        [DbNodeType.RacingSeries, Neo4jNodeType.RacingSeries],
        [DbNodeType.RacingEvent, Neo4jNodeType.RacingEvent],
        [DbNodeType.RacingSession, Neo4jNodeType.RacingSession],
        [DbNodeType.SessionResult, Neo4jNodeType.SessionResult],
        [DbNodeType.LapTime, Neo4jNodeType.LapTime],
        [DbNodeType.RacingGame, Neo4jNodeType.RacingGame],
        [DbNodeType.GamingPlatform, Neo4jNodeType.GamingPlatform],
        [DbNodeType.Magazine, Neo4jNodeType.Magazine],
        [DbNodeType.Image, Neo4jNodeType.Image],
        [DbNodeType.Node, Neo4jNodeType.Node],
    ])

    const mappedNodeType = mapping.get(nodeTypeLabel)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeNotFoundError(nodeTypeLabel)
    }

    return mappedNodeType
}
