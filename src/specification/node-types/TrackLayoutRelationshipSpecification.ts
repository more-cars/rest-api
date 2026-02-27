import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const TrackLayoutRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RaceTrack,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
