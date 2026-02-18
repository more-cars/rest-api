import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RaceTrackRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RaceTrackHasLayout, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasLayout,
        isReverseRelationship: false,
    }],
    [DbRelationship.RaceTrackHostedRacingEvent, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHostedRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.RaceTrackHasImage, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RaceTrackHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RaceTrack,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasPrimeImage,
        isReverseRelationship: false,
    }],
]
