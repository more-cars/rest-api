import {DbNodeType} from "../../src/db/types/DbNodeType"
import {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export const NodeTypeMapping = new Map<DbNodeType, NodeTypeLabelOld>([
    [DbNodeType.Company, NodeTypeLabelOld.Company],
    [DbNodeType.Brand, NodeTypeLabelOld.Brand],
    [DbNodeType.CarModel, NodeTypeLabelOld.CarModel],
    [DbNodeType.CarModelVariant, NodeTypeLabelOld.CarModelVariant],
    [DbNodeType.Price, NodeTypeLabelOld.Price],
    [DbNodeType.RaceTrack, NodeTypeLabelOld.RaceTrack],
    [DbNodeType.TrackLayout, NodeTypeLabelOld.TrackLayout],
    [DbNodeType.RacingSeries, NodeTypeLabelOld.RacingSeries],
    [DbNodeType.RacingEvent, NodeTypeLabelOld.RacingEvent],
    [DbNodeType.RacingSession, NodeTypeLabelOld.RacingSession],
    [DbNodeType.SessionResult, NodeTypeLabelOld.SessionResult],
    [DbNodeType.LapTime, NodeTypeLabelOld.LapTime],
    [DbNodeType.RacingGame, NodeTypeLabelOld.RacingGame],
    [DbNodeType.GamingPlatform, NodeTypeLabelOld.GamingPlatform],
    [DbNodeType.ModelCar, NodeTypeLabelOld.ModelCar],
    [DbNodeType.ModelCarBrand, NodeTypeLabelOld.ModelCarBrand],
    [DbNodeType.Magazine, NodeTypeLabelOld.Magazine],
    [DbNodeType.MagazineIssue, NodeTypeLabelOld.MagazineIssue],
    [DbNodeType.Rating, NodeTypeLabelOld.Rating],
    [DbNodeType.Programme, NodeTypeLabelOld.Programme],
    [DbNodeType.ProgrammeEpisode, NodeTypeLabelOld.ProgrammeEpisode],
    [DbNodeType.MotorShow, NodeTypeLabelOld.MotorShow],
    [DbNodeType.Image, NodeTypeLabelOld.Image],
])
