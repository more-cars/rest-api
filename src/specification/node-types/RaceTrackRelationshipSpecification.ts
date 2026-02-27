import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const RaceTrackRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.RaceTrackHasLayout, {
        startNodeType: NodeType.RaceTrack,
        endNodeType: NodeType.TrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHostedRacingEvent, {
        startNodeType: NodeType.RaceTrack,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RaceTrackHasImage, {
        startNodeType: NodeType.RaceTrack,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHasPrimeImage, {
        startNodeType: NodeType.RaceTrack,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
