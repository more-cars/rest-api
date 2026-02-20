import {NodeType} from "../types/NodeType"
import {DbNodeType} from "../../db/types/DbNodeType"

export function mapModelNodeTypeToDbNodeType(nodeType: NodeType) {
    const mapping = new Map<NodeType, DbNodeType>([
        [NodeType.NODE, DbNodeType.Node],
        [NodeType.IMAGE, DbNodeType.Image],
        [NodeType.COMPANY, DbNodeType.Company],
        [NodeType.BRAND, DbNodeType.Brand],
        [NodeType.CAR_MODEL, DbNodeType.CarModel],
        [NodeType.CAR_MODEL_VARIANT, DbNodeType.CarModelVariant],
        [NodeType.RACE_TRACK, DbNodeType.RaceTrack],
        [NodeType.TRACK_LAYOUT, DbNodeType.TrackLayout],
        [NodeType.RACING_SERIES, DbNodeType.RacingSeries],
        [NodeType.RACING_EVENT, DbNodeType.RacingEvent],
        [NodeType.RACING_SESSION, DbNodeType.RacingSession],
        [NodeType.SESSION_RESULT, DbNodeType.SessionResult],
        [NodeType.LAP_TIME, DbNodeType.LapTime],
        [NodeType.RACING_GAME, DbNodeType.RacingGame],
        [NodeType.GAMING_PLATFORM, DbNodeType.GamingPlatform],
    ])

    const dbNodeType = mapping.get(nodeType)

    if (dbNodeType === null || dbNodeType === undefined) {
        throw new Error(`No mapping found for node type ${nodeType}`)
    }

    return dbNodeType
}
