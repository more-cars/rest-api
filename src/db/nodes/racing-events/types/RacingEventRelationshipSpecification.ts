import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingEventRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSeries,
        relationshipName: RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventIsFollowedByEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventFollowsEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasRacingSession,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasPrimeImage,
        isReverseRelationship: false,
    }],
]
