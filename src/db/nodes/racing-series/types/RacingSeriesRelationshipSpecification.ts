import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {DbRelationship} from "../../../types/DbRelationship"
import {NodeTypeLabel} from "../../../NodeTypeLabel"
import {DbRelationshipName} from "../../../types/DbRelationshipName"

export const RacingSeriesRelationshipSpecification: RelationshipSpecification[] = [
    [DbRelationship.RacingSeriesHasRacingEvent, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.RacingEvent,
        relationshipName: DbRelationshipName.RacingSeriesHasRacingEvent,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSeriesHasImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingSeriesHasImage,
        isReverseRelationship: false,
    }],
    [DbRelationship.RacingSeriesHasPrimeImage, {
        startNodeLabel: NodeTypeLabel.RacingSeries,
        endNodeLabel: NodeTypeLabel.Image,
        relationshipName: DbRelationshipName.RacingSeriesHasPrimeImage,
        isReverseRelationship: false,
    }],
]
