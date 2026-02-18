import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {RelationshipTypeNeo4j} from "../../../types/RelationshipTypeNeo4j"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingSeriesHasRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasRacingEvent,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSeriesHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSeriesHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: RelationshipTypeNeo4j.RacingSeriesHasPrimeImage,
        isReverseRelationship: false,
    }],
]
