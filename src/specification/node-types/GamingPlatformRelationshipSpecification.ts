import {RelationshipTypeSpecification} from "../RelationshipTypeSpecification"
import {RelationshipType} from "../RelationshipType"
import {DbNodeType} from "../../db/types/DbNodeType"

export const GamingPlatformRelationshipSpecification: RelationshipTypeSpecification[] = [
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
