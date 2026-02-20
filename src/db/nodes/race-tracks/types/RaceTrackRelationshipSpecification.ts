import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RaceTrackRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RaceTrackHasLayout, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHostedRacingEvent, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHostedRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RaceTrackHasImage, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHasPrimeImage, {
        startNodeType: DbNodeType.RaceTrack,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasPrimeImage,
        isReverseRelationship: false,
    }],
]
