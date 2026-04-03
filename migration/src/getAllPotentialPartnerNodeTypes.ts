import {DbNodeType} from "../../src/db/types/DbNodeType"

// This considers only the outgoing relationships (has-relationships, not the belongs-to relationships).
export function getAllPotentialPartnerNodeTypes() {
    return new Map<DbNodeType, DbNodeType[]>([
        [DbNodeType.Company, [
            DbNodeType.Brand,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.Brand, [
            DbNodeType.CarModel,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.CarModel, [
            DbNodeType.CarModel,
            DbNodeType.CarModelVariant,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.CarModelVariant, [
            DbNodeType.SessionResult,
            DbNodeType.Price,
            DbNodeType.ModelCar,
            DbNodeType.LapTime,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.Price, [
            DbNodeType.Image,
        ]],
        [DbNodeType.RaceTrack, [
            DbNodeType.TrackLayout,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.TrackLayout, [
            DbNodeType.LapTime,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingSeries, [
            DbNodeType.RacingEvent,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingEvent, [
            DbNodeType.RacingEvent,
            DbNodeType.RaceTrack,
            DbNodeType.TrackLayout,
            DbNodeType.RacingSession,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingSession, [
            DbNodeType.SessionResult,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.SessionResult, [
            DbNodeType.LapTime,
            DbNodeType.Image,
        ]],
        [DbNodeType.LapTime, [
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingGame, [
            DbNodeType.CarModelVariant,
            DbNodeType.TrackLayout,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.GamingPlatform, [
            DbNodeType.RacingGame,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.ModelCar, [
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.ModelCarBrand, [
            DbNodeType.ModelCar,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.Magazine, [
            DbNodeType.MagazineIssue,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.MagazineIssue, [
            DbNodeType.MagazineIssue,
            DbNodeType.CarModel,
            DbNodeType.CarModelVariant,
            DbNodeType.RacingEvent,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.Rating, [
            DbNodeType.MagazineIssue,
            DbNodeType.CarModelVariant,
            DbNodeType.Image,
        ]],
        [DbNodeType.Programme, [
            DbNodeType.ProgrammeEpisode,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.ProgrammeEpisode, [
            DbNodeType.ProgrammeEpisode,
            DbNodeType.CarModel,
            DbNodeType.CarModelVariant,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
        [DbNodeType.MotorShow, [
            DbNodeType.CarModelVariant,
            DbNodeType.Video,
            DbNodeType.Image,
        ]],
    ])
}
