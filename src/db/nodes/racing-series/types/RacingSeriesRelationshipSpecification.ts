import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {Neo4jNodeType} from "../../../types/Neo4jNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeLabel: Neo4jNodeType.RacingSeries,
        endNodeLabel: Neo4jNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasRacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeLabel: Neo4jNodeType.RacingSeries,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeLabel: Neo4jNodeType.RacingSeries,
        endNodeLabel: Neo4jNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasPrimeImage,
        isReverseRelationship: false,
    }],
]
