import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<Neo4jNodeType, NodeTypeLabelOld>([
    [Neo4jNodeType.Company, NodeTypeLabelOld.Company],
    [Neo4jNodeType.Brand, NodeTypeLabelOld.Brand],
    [Neo4jNodeType.CarModel, NodeTypeLabelOld.CarModel],
    [Neo4jNodeType.CarModelVariant, NodeTypeLabelOld.CarModelVariant],
    [Neo4jNodeType.RaceTrack, NodeTypeLabelOld.RaceTrack],
    [Neo4jNodeType.TrackLayout, NodeTypeLabelOld.TrackLayout],
    [Neo4jNodeType.RacingSeries, NodeTypeLabelOld.RacingSeries],
    [Neo4jNodeType.RacingEvent, NodeTypeLabelOld.RacingEvent],
    [Neo4jNodeType.RacingSession, NodeTypeLabelOld.RacingSession],
    [Neo4jNodeType.SessionResult, NodeTypeLabelOld.SessionResult],
    [Neo4jNodeType.LapTime, NodeTypeLabelOld.LapTime],
    [Neo4jNodeType.RacingGame, NodeTypeLabelOld.RacingGame],
    [Neo4jNodeType.GamingPlatform, NodeTypeLabelOld.GamingPlatform],
    [Neo4jNodeType.Image, NodeTypeLabelOld.Image],
])
