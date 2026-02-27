import {ModelNodeType} from "../models/types/ModelNodeType"
import {NodeType} from "./NodeType"
import {NodeTypeMappingNotFoundError} from "./NodeTypeMappingNotFoundError"

export function mapModelNodeTypeToNodeType(nodeType: ModelNodeType): NodeType {
    const mapping = new Map<ModelNodeType, NodeType>([
        [ModelNodeType.Company, NodeType.Company],
        [ModelNodeType.Brand, NodeType.Brand],
        [ModelNodeType.CarModel, NodeType.CarModel],
        [ModelNodeType.CarModelVariant, NodeType.CarModelVariant],
        [ModelNodeType.RaceTrack, NodeType.RaceTrack],
        [ModelNodeType.TrackLayout, NodeType.TrackLayout],
        [ModelNodeType.RacingSeries, NodeType.RacingSeries],
        [ModelNodeType.RacingEvent, NodeType.RacingEvent],
        [ModelNodeType.RacingSession, NodeType.RacingSession],
        [ModelNodeType.SessionResult, NodeType.SessionResult],
        [ModelNodeType.LapTime, NodeType.LapTime],
        [ModelNodeType.RacingGame, NodeType.RacingGame],
        [ModelNodeType.GamingPlatform, NodeType.GamingPlatform],
        [ModelNodeType.Magazine, NodeType.Magazine],
        [ModelNodeType.Image, NodeType.Image],
        [ModelNodeType.Node, NodeType.Node],
    ])

    const mappedNodeType = mapping.get(nodeType)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeMappingNotFoundError(nodeType)
    }

    return mappedNodeType
}
