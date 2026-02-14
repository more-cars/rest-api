import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const TrackLayoutRelComposition: RelComposition[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACE_TRACK,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACING_EVENT,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeType: NodeType.TRACK_LAYOUT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
