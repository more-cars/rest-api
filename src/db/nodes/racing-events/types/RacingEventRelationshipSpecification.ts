import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingEventRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingEventBelongsToRacingSeries, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.RacingSeries,
        relationshipName: RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventIsFollowedByEvent, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventIsFollowedByEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventFollowsEvent, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingEventFollowsEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingEventTookPlaceAtRaceTrack, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.RaceTrack,
        relationshipName: RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventUsedTheTrackLayout, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasRacingSession, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.RacingSession,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasRacingSession,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasImage, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingEventHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.RacingEvent,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingEventHasPrimeImage,
        isReverseRelationship: false,
    }],
]
