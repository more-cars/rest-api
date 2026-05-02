import {DbNodeType} from "../../src/db/types/DbNodeType"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMappingReversed = new Map<NodeTypeLabelOld, DbNodeType>([
    [NodeTypeLabelOld.Company, DbNodeType.Company],
    [NodeTypeLabelOld.Brand, DbNodeType.Brand],
    [NodeTypeLabelOld.CarModel, DbNodeType.CarModel],
    [NodeTypeLabelOld.CarModelVariant, DbNodeType.CarModelVariant],
    [NodeTypeLabelOld.Price, DbNodeType.Price],
    [NodeTypeLabelOld.RaceTrack, DbNodeType.RaceTrack],
    [NodeTypeLabelOld.TrackLayout, DbNodeType.TrackLayout],
    [NodeTypeLabelOld.RacingSeries, DbNodeType.RacingSeries],
    [NodeTypeLabelOld.RacingEvent, DbNodeType.RacingEvent],
    [NodeTypeLabelOld.RacingSession, DbNodeType.RacingSession],
    [NodeTypeLabelOld.SessionResult, DbNodeType.SessionResult],
    [NodeTypeLabelOld.LapTime, DbNodeType.LapTime],
    [NodeTypeLabelOld.RacingGame, DbNodeType.RacingGame],
    [NodeTypeLabelOld.GamingPlatform, DbNodeType.GamingPlatform],
    [NodeTypeLabelOld.ModelCar, DbNodeType.ModelCar],
    [NodeTypeLabelOld.ModelCarBrand, DbNodeType.ModelCarBrand],
    [NodeTypeLabelOld.Magazine, DbNodeType.Magazine],
    [NodeTypeLabelOld.MagazineIssue, DbNodeType.MagazineIssue],
    [NodeTypeLabelOld.Rating, DbNodeType.Rating],
    [NodeTypeLabelOld.Programme, DbNodeType.Programme],
    [NodeTypeLabelOld.ProgrammeEpisode, DbNodeType.ProgrammeEpisode],
    [NodeTypeLabelOld.MotorShow, DbNodeType.MotorShow],
    [NodeTypeLabelOld.Video, DbNodeType.Video],
    [NodeTypeLabelOld.Image, DbNodeType.Image],
])
