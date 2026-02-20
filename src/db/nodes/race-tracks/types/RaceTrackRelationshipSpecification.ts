import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RaceTrackRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RaceTrackHasLayout, {
        startNodeLabel: Neo4jNodeType.RaceTrack,
        endNodeLabel: Neo4jNodeType.TrackLayout,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasLayout,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHostedRacingEvent, {
        startNodeLabel: Neo4jNodeType.RaceTrack,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHostedRacingEvent,
        isReverseRelationship: true,
    }],
    [RelationshipType.RaceTrackHasImage, {
        startNodeLabel: Neo4jNodeType.RaceTrack,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RaceTrackHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.RaceTrack,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RaceTrackHasPrimeImage,
        isReverseRelationship: false,
    }],
]
