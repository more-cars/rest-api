import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const RacingEventRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingEventBelongsToRacingSeries, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSeries,
        relationshipName: DbRelationshipName.RacingEventBelongsToRacingSeries,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingEventIsFollowedByEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.RacingEventIsFollowedByEvent,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventFollowsEvent, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.RacingEventFollowsEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RacingEventTookPlaceAtRaceTrack, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: DbRelationshipName.RacingEventTookPlaceAtRaceTrack,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventUsedTheTrackLayout, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: DbRelationshipName.RacingEventUsedTheTrackLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasRacingSession, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.RacingSession,
        relationshipName: DbRelationshipName.RacingEventHasRacingSession,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingEventHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingEventHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingEvent,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingEventHasPrimeImage,
        isReverseRelationship: false,
    }],
]
