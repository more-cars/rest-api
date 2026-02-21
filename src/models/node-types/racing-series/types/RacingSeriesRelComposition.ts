import {RelComposition} from "../../../relationships/types/RelComposition"
import {RelType} from "../../../relationships/types/RelType"
import {ModelNodeType} from "../../../types/ModelNodeType"

export const RacingSeriesRelComposition: RelComposition[] = [
    [RelType.RacingSeriesHasRacingEvent, {
        startNodeType: ModelNodeType.RacingSeries,
        endNodeType: ModelNodeType.RacingEvent,
        isReverseRelationship: false,
    }],
    [RelType.RacingSeriesHasImage, {
        startNodeType: ModelNodeType.RacingSeries,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelType.RacingSeriesHasPrimeImage, {
        startNodeType: ModelNodeType.RacingSeries,
        endNodeType: ModelNodeType.Image,
        isReverseRelationship: false,
    }],
]
