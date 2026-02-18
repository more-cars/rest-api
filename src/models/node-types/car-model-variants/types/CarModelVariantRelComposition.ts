import {RelType} from "../../../relationships/types/RelType"
import {NodeType} from "../../../types/NodeType"
import {RelComposition} from "../../../relationships/types/RelComposition"

export const CarModelVariantRelComposition: RelComposition[] = [
    [RelType.CarModelVariantIsVariantOf, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: true,
    }],
    [RelType.CarModelVariantAchievedSessionResult, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantAchievedLapTime, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: true,
    }],
    [RelType.CarModelVariantHasImage, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelType.CarModelVariantHasPrimeImage, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
