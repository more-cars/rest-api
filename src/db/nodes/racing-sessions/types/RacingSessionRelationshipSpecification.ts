import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSessionRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSessionBelongsToRacingEvent, {
        startNodeLabel: Neo4jNodeType.RacingSession,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RacingSessionHasSessionResult, {
        startNodeLabel: Neo4jNodeType.RacingSession,
        endNodeLabel: Neo4jNodeType.SessionResult,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasSessionResult,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasImage, {
        startNodeLabel: Neo4jNodeType.RacingSession,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSessionHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.RacingSession,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSessionHasPrimeImage,
        isReverseRelationship: false,
    }],
]
