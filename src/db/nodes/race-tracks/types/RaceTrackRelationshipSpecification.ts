import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const RaceTrackRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RaceTrackHasLayout, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHostedRacingEvent, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RaceTrackHasImage, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHasPrimeImage, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
