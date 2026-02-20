import {NodeType} from "../types/NodeType"
import {Neo4jNodeType} from "../../db/types/Neo4jNodeType"

export function getDbNodeType(nodeType: NodeType) {
    const mapping = new Map<NodeType, Neo4jNodeType>([
        [NodeType.NODE, Neo4jNodeType.Node],
        [NodeType.IMAGE, Neo4jNodeType.Image],
        [NodeType.COMPANY, Neo4jNodeType.Company],
        [NodeType.BRAND, Neo4jNodeType.Brand],
        [NodeType.CAR_MODEL, Neo4jNodeType.CarModel],
        [NodeType.CAR_MODEL_VARIANT, Neo4jNodeType.CarModelVariant],
        [NodeType.RACE_TRACK, Neo4jNodeType.RaceTrack],
        [NodeType.TRACK_LAYOUT, Neo4jNodeType.TrackLayout],
        [NodeType.RACING_SERIES, Neo4jNodeType.RacingSeries],
        [NodeType.RACING_EVENT, Neo4jNodeType.RacingEvent],
        [NodeType.RACING_SESSION, Neo4jNodeType.RacingSession],
        [NodeType.SESSION_RESULT, Neo4jNodeType.SessionResult],
        [NodeType.LAP_TIME, Neo4jNodeType.LapTime],
        [NodeType.RACING_GAME, Neo4jNodeType.RacingGame],
        [NodeType.GAMING_PLATFORM, Neo4jNodeType.GamingPlatform],
    ])

    const dbNodeType = mapping.get(nodeType)

    if (dbNodeType === null || dbNodeType === undefined) {
        throw new Error(`No mapping found for node type ${nodeType}`)
    }

    return dbNodeType
}
