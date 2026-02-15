import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const RaceTrackRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RaceTrackHasLayout, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: DbRelationshipName.RaceTrackHasLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RaceTrackHostedRacingEvent, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.RaceTrackHostedRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RaceTrackHasImage, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RaceTrackHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RaceTrackHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RaceTrackHasPrimeImage,
        isReverseRelationship: false,
    }],
]
