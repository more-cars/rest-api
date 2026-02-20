import {DbNodeType} from "../../src/db/types/DbNodeType"

// This considers only the outgoing relationships (has-relationships, not the belongs-to relationships).
export function getAllPotentialPartnerNodeTypes() {
    return new Map<DbNodeType, DbNodeType[]>([
        [DbNodeType.Company, [
            DbNodeType.Brand,
            DbNodeType.Image,
        ]],
        [DbNodeType.Brand, [
            DbNodeType.CarModel,
            DbNodeType.Image,
        ]],
        [DbNodeType.CarModel, [
            DbNodeType.CarModel,
            DbNodeType.CarModelVariant,
            DbNodeType.Image,
        ]],
        [DbNodeType.CarModelVariant, [
            DbNodeType.SessionResult,
            DbNodeType.LapTime,
            DbNodeType.Image,
        ]],
        [DbNodeType.RaceTrack, [
            DbNodeType.TrackLayout,
            DbNodeType.Image,
        ]],
        [DbNodeType.TrackLayout, [
            DbNodeType.LapTime,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingSeries, [
            DbNodeType.RacingEvent,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingEvent, [
            DbNodeType.RacingEvent,
            DbNodeType.RaceTrack,
            DbNodeType.TrackLayout,
            DbNodeType.RacingSession,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingSession, [
            DbNodeType.SessionResult,
            DbNodeType.Image,
        ]],
        [DbNodeType.SessionResult, [
            DbNodeType.LapTime,
            DbNodeType.Image,
        ]],
        [DbNodeType.RacingGame, [
            DbNodeType.CarModelVariant,
            DbNodeType.TrackLayout,
            DbNodeType.Image,
        ]],
        [DbNodeType.GamingPlatform, [
            DbNodeType.RacingGame,
            DbNodeType.Image,
        ]],
        [DbNodeType.LapTime, [
            DbNodeType.Image,
        ]],
    ])
}
