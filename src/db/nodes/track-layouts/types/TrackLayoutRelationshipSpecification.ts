import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const TrackLayoutRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeType: DbNodeType.TrackLayout,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasPrimeImage,
        isReverseRelationship: false,
    }],
]
