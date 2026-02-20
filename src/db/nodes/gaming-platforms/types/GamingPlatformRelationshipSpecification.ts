import {RelationshipSpecification} from "../../../types/RelationshipSpecification"
import {RelationshipType} from "../../../types/RelationshipType"
import {DbNodeType} from "../../../types/DbNodeType"

export const GamingPlatformRelationshipSpecification: RelationshipSpecification[] = [
    [RelationshipType.GamingPlatformFeaturesRacingGame, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.RacingGame,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasImage, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
    [RelationshipType.GamingPlatformHasPrimeImage, {
        startNodeType: DbNodeType.GamingPlatform,
        endNodeType: DbNodeType.Image,
        isReverseRelationship: false,
    }],
]
