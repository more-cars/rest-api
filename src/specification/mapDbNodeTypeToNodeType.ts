import {NodeType} from "./NodeType"
import {DbNodeType} from "../db/types/DbNodeType"
import {NodeTypeNotFoundError} from "../db/types/NodeTypeNotFoundError"

export function mapDbNodeTypeToNodeType(nodeType: DbNodeType): NodeType {
    const mapping = new Map<DbNodeType, NodeType>([
        [DbNodeType.Company, NodeType.Company],
        [DbNodeType.Brand, NodeType.Brand],
        [DbNodeType.CarModel, NodeType.CarModel],
        [DbNodeType.CarModelVariant, NodeType.CarModelVariant],
        [DbNodeType.RaceTrack, NodeType.RaceTrack],
        [DbNodeType.TrackLayout, NodeType.TrackLayout],
        [DbNodeType.RacingSeries, NodeType.RacingSeries],
        [DbNodeType.RacingEvent, NodeType.RacingEvent],
        [DbNodeType.RacingSession, NodeType.RacingSession],
        [DbNodeType.SessionResult, NodeType.SessionResult],
        [DbNodeType.LapTime, NodeType.LapTime],
        [DbNodeType.RacingGame, NodeType.RacingGame],
        [DbNodeType.GamingPlatform, NodeType.GamingPlatform],
        [DbNodeType.Image, NodeType.Image],
        [DbNodeType.Node, NodeType.Node],
    ])

    const mappedNodeType = mapping.get(nodeType)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeNotFoundError(nodeType)
    }

    return mappedNodeType
}
