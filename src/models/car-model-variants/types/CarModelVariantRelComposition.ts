import {RelationshipType} from "../../relationships/types/RelationshipType"
import {NodeType} from "../../types/NodeType"
import {RelComposition} from "../../relationships/types/RelComposition"

export const CarModelVariantRelComposition: RelComposition[] = [
    [RelationshipType.CarModelVariantIsVariantOf, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.CAR_MODEL,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantAchievedSessionResult, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.SESSION_RESULT,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantAchievedLapTime, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.LAP_TIME,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantIsFeaturedInRacingGame, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.RACING_GAME,
        isReverseRelationship: true,
    }],
    [RelationshipType.CarModelVariantHasImage, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
    [RelationshipType.CarModelVariantHasPrimeImage, {
        startNodeType: NodeType.CAR_MODEL_VARIANT,
        endNodeType: NodeType.IMAGE,
        isReverseRelationship: false,
    }],
]
