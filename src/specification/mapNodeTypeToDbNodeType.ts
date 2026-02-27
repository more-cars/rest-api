import {NodeType} from "./NodeType"
import {DbNodeType} from "../db/types/DbNodeType"
import {NodeTypeMappingNotFoundError} from "./NodeTypeMappingNotFoundError"

export function mapNodeTypeToDbNodeType(nodeType: NodeType): DbNodeType {
    const mapping = new Map<NodeType, DbNodeType>([
        [NodeType.Company, DbNodeType.Company],
        [NodeType.Brand, DbNodeType.Brand],
        [NodeType.CarModel, DbNodeType.CarModel],
        [NodeType.CarModelVariant, DbNodeType.CarModelVariant],
        [NodeType.RaceTrack, DbNodeType.RaceTrack],
        [NodeType.TrackLayout, DbNodeType.TrackLayout],
        [NodeType.RacingSeries, DbNodeType.RacingSeries],
        [NodeType.RacingEvent, DbNodeType.RacingEvent],
        [NodeType.RacingSession, DbNodeType.RacingSession],
        [NodeType.SessionResult, DbNodeType.SessionResult],
        [NodeType.LapTime, DbNodeType.LapTime],
        [NodeType.RacingGame, DbNodeType.RacingGame],
        [NodeType.GamingPlatform, DbNodeType.GamingPlatform],
        [NodeType.Magazine, DbNodeType.Magazine],
        [NodeType.Image, DbNodeType.Image],
        [NodeType.Node, DbNodeType.Node],
    ])

    const mappedNodeType = mapping.get(nodeType)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeMappingNotFoundError(nodeType)
    }

    return mappedNodeType
}
