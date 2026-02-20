import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasRacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeType: DbNodeType.RacingSeries,
        endNodeType: DbNodeType.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasPrimeImage,
        isReverseRelationship: false,
    }],
]
