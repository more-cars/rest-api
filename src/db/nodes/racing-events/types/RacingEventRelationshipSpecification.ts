import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingEventRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingEventBelongsToRacingSeries, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSeries,
        relationshipName: RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingEventIsFollowedByEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventIsFollowedByEvent,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventFollowsEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventFollowsEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingEventTookPlaceAtRaceTrack, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventUsedTheTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasRacingSession, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasRacingSession,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasPrimeImage,
        isReverseRelationship: false,
    }],
]
