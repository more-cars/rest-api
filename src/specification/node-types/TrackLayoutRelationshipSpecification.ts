import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {NodeType} from "../NodeType"

export const TrackLayoutRelationshipSpecification: RelationshipTypeSpecification[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.RaceTrack,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.RacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.LapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.RacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeType: NodeType.TrackLayout,
        endNodeType: NodeType.Image,
        isReverseRelationship: false,
    }],
]
