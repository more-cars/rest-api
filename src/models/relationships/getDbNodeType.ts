import {NodeType} from "../types/NodeType"
import {NodeTypeLabel} from "../../db/NodeTypeLabel"

export function getDbNodeType(nodeType: NodeType) {
    const mapping = new Map<NodeType, NodeTypeLabel>([
        [NodeType.IMAGE, NodeTypeLabel.Image],
        [NodeType.COMPANY, NodeTypeLabel.Company],
        [NodeType.BRAND, NodeTypeLabel.Brand],
        [NodeType.CAR_MODEL, NodeTypeLabel.CarModel],
        [NodeType.CAR_MODEL_VARIANT, NodeTypeLabel.CarModelVariant],
        [NodeType.RACE_TRACK, NodeTypeLabel.RaceTrack],
        [NodeType.TRACK_LAYOUT, NodeTypeLabel.TrackLayout],
        [NodeType.RACING_SERIES, NodeTypeLabel.RacingSeries],
        [NodeType.RACING_EVENT, NodeTypeLabel.RacingEvent],
        [NodeType.RACING_SESSION, NodeTypeLabel.RacingSession],
        [NodeType.SESSION_RESULT, NodeTypeLabel.SessionResult],
        [NodeType.LAP_TIME, NodeTypeLabel.LapTime],
        [NodeType.RACING_GAME, NodeTypeLabel.RacingGame],
        [NodeType.GAMING_PLATFORM, NodeTypeLabel.GamingPlatform],
    ])

    const dbNodeType = mapping.get(nodeType)

    if (!dbNodeType) {
        throw new Error(`No mapping found for node type ${nodeType}`)
    }

    return dbNodeType
}
