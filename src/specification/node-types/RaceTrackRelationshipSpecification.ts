import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const RaceTrackRelationshipSpecification: RelationshipTypeSpecification[] = [
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
