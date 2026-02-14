import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const RaceTrackRelComposition: RelComposition[] = [
    [RelationshipType.RaceTrackHasLayout, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.TRACK_LAYOUT,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHostedRacingEvent, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelationshipType.RaceTrackHasImage, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHasPrimeImage, {
        startNodeType: NodeType.RACE_TRACK,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
