import {DbNodeType} from "../../src/db/types/DbNodeType"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<DbNodeType, NodeTypeLabelOld>([
    [DbNodeType.Company, NodeTypeLabelOld.Company],
    [DbNodeType.Brand, NodeTypeLabelOld.Brand],
    [DbNodeType.CarModel, NodeTypeLabelOld.CarModel],
    [DbNodeType.CarModelVariant, NodeTypeLabelOld.CarModelVariant],
    [DbNodeType.RaceTrack, NodeTypeLabelOld.RaceTrack],
    [DbNodeType.TrackLayout, NodeTypeLabelOld.TrackLayout],
    [DbNodeType.RacingSeries, NodeTypeLabelOld.RacingSeries],
    [DbNodeType.RacingEvent, NodeTypeLabelOld.RacingEvent],
    [DbNodeType.RacingSession, NodeTypeLabelOld.RacingSession],
    [DbNodeType.SessionResult, NodeTypeLabelOld.SessionResult],
    [DbNodeType.LapTime, NodeTypeLabelOld.LapTime],
    [DbNodeType.RacingGame, NodeTypeLabelOld.RacingGame],
    [DbNodeType.GamingPlatform, NodeTypeLabelOld.GamingPlatform],
    [DbNodeType.Image, NodeTypeLabelOld.Image],
])
