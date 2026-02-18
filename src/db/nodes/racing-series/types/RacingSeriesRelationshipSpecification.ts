import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.RacingSeriesHasRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasRacingEvent,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasImage,
        isReverseRelationship: false,
    }],
    [RelationshipType.RacingSeriesHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasPrimeImage,
        isReverseRelationship: false,
    }],
]
