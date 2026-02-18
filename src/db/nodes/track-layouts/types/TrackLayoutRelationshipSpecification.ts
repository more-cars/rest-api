import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const TrackLayoutRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasPrimeImage,
        isReverseRelationship: false,
    }],
]
