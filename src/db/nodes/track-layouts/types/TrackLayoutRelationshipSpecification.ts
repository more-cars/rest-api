import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const TrackLayoutRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.TrackLayoutBelongsToRaceTrack, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutWasUsedByRacingEvent, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutHasLapTime, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.LapTime,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasLapTime,
        isReverseRelationship: false,
    }],
    [DbRelationship.TrackLayoutIsFeaturedInRacingGame, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.RacingGame,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [DbRelationship.TrackLayoutHasImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.TrackLayoutHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.TrackLayout,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasPrimeImage,
        isReverseRelationship: false,
    }],
]
