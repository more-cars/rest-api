import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const TrackLayoutRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.TrackLayoutBelongsToRaceTrack, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutWasUsedByRacingEvent, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasLapTime, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.LapTime,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasLapTime,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutIsFeaturedInRacingGame, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.RacingGame,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame,
        isReverseRelationship: true,
    }],
    [RelationshipType.TrackLayoutHasImage, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.TrackLayoutHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.TrackLayout,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.TrackLayoutHasPrimeImage,
        isReverseRelationship: false,
    }],
]
