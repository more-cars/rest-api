import {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"

// This considers only the outgoing relationships (has-relationships, not the belongs-to relationships).
export function getAllPotentialPartnerNodeTypes() {
    return new Map<Neo4jNodeType, Neo4jNodeType[]>([
        [Neo4jNodeType.Company, [
            Neo4jNodeType.Brand,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.Brand, [
            Neo4jNodeType.CarModel,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.CarModel, [
            Neo4jNodeType.CarModel,
            Neo4jNodeType.CarModelVariant,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.CarModelVariant, [
            Neo4jNodeType.SessionResult,
            Neo4jNodeType.LapTime,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.RaceTrack, [
            Neo4jNodeType.TrackLayout,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.TrackLayout, [
            Neo4jNodeType.LapTime,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.RacingSeries, [
            Neo4jNodeType.RacingEvent,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.RacingEvent, [
            Neo4jNodeType.RacingEvent,
            Neo4jNodeType.RaceTrack,
            Neo4jNodeType.TrackLayout,
            Neo4jNodeType.RacingSession,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.RacingSession, [
            Neo4jNodeType.SessionResult,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.SessionResult, [
            Neo4jNodeType.LapTime,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.RacingGame, [
            Neo4jNodeType.CarModelVariant,
            Neo4jNodeType.TrackLayout,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.GamingPlatform, [
            Neo4jNodeType.RacingGame,
            Neo4jNodeType.Image,
        ]],
        [Neo4jNodeType.LapTime, [
            Neo4jNodeType.Image,
        ]],
    ])
}
