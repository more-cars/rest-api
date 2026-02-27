import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {RelationshipDirection} from "../types/RelationshipDirection"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {RelationshipType} from "../types/RelationshipType"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function mapNeo4jRelationshipTypeToDbRelationshipType(
    startNodeLabel: Neo4jNodeType,
    relationshipDirection: RelationshipDirection,
    neo4jRelationshipType: RelationshipTypeNeo4j,
): RelationshipType {
    const mapping = new Map<Neo4jNodeType, Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>>([
        [Neo4jNodeType.Company, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.CompanyHasBrand, RelationshipType.CompanyHasBrand],
                [RelationshipTypeNeo4j.CompanyHasImage, RelationshipType.CompanyHasImage],
                [RelationshipTypeNeo4j.CompanyHasPrimeImage, RelationshipType.CompanyHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Brand, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.BrandBelongsToCompany, RelationshipType.BrandBelongsToCompany],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.BrandHasCarModel, RelationshipType.BrandHasCarModel],
                [RelationshipTypeNeo4j.BrandHasImage, RelationshipType.BrandHasImage],
                [RelationshipTypeNeo4j.BrandHasPrimeImage, RelationshipType.BrandHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.CarModel, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.CarModelBelongsToBrand, RelationshipType.CarModelBelongsToBrand],
                [RelationshipTypeNeo4j.CarModelIsSuccessorOf, RelationshipType.CarModelIsSuccessorOf],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.CarModelHasSuccessor, RelationshipType.CarModelHasSuccessor],
                [RelationshipTypeNeo4j.CarModelHasVariant, RelationshipType.CarModelHasVariant],
                [RelationshipTypeNeo4j.CarModelHasImage, RelationshipType.CarModelHasImage],
                [RelationshipTypeNeo4j.CarModelHasPrimeImage, RelationshipType.CarModelHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.CarModelVariant, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.CarModelVariantIsVariantOf, RelationshipType.CarModelVariantIsVariantOf],
                [RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult, RelationshipType.CarModelVariantAchievedSessionResult],
                [RelationshipTypeNeo4j.CarModelVariantAchievedLapTime, RelationshipType.CarModelVariantAchievedLapTime],
                [RelationshipTypeNeo4j.CarModelVariantHasImage, RelationshipType.CarModelVariantHasImage],
                [RelationshipTypeNeo4j.CarModelVariantHasPrimeImage, RelationshipType.CarModelVariantHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RaceTrack, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.RaceTrackHostedRacingEvent, RelationshipType.RaceTrackHostedRacingEvent],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.RaceTrackHasLayout, RelationshipType.RaceTrackHasLayout],
                [RelationshipTypeNeo4j.RaceTrackHasImage, RelationshipType.RaceTrackHasImage],
                [RelationshipTypeNeo4j.RaceTrackHasPrimeImage, RelationshipType.RaceTrackHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.TrackLayout, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack],
                [RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent],
                [RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.TrackLayoutHasLapTime, RelationshipType.TrackLayoutHasLapTime],
                [RelationshipTypeNeo4j.TrackLayoutHasImage, RelationshipType.TrackLayoutHasImage],
                [RelationshipTypeNeo4j.TrackLayoutHasPrimeImage, RelationshipType.TrackLayoutHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingSeries, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                //
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.RacingSeriesHasRacingEvent, RelationshipType.RacingSeriesHasRacingEvent],
                [RelationshipTypeNeo4j.RacingSeriesHasImage, RelationshipType.RacingSeriesHasImage],
                [RelationshipTypeNeo4j.RacingSeriesHasPrimeImage, RelationshipType.RacingSeriesHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingEvent, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries, RelationshipType.RacingEventBelongsToRacingSeries],
                [RelationshipTypeNeo4j.RacingEventFollowsEvent, RelationshipType.RacingEventFollowsEvent],

            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.RacingEventIsFollowedByEvent, RelationshipType.RacingEventIsFollowedByEvent],
                [RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack],
                [RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout, RelationshipType.RacingEventUsedTheTrackLayout],
                [RelationshipTypeNeo4j.RacingEventHasRacingSession, RelationshipType.RacingEventHasRacingSession],
                [RelationshipTypeNeo4j.RacingEventHasImage, RelationshipType.RacingEventHasImage],
                [RelationshipTypeNeo4j.RacingEventHasPrimeImage, RelationshipType.RacingEventHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingSession, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.RacingSessionHasSessionResult, RelationshipType.RacingSessionHasSessionResult],
                [RelationshipTypeNeo4j.RacingSessionHasImage, RelationshipType.RacingSessionHasImage],
                [RelationshipTypeNeo4j.RacingSessionHasPrimeImage, RelationshipType.RacingSessionHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.SessionResult, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.SessionResultBelongsToRacingSession, RelationshipType.SessionResultBelongsToRacingSession],
                [RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.SessionResultHasLapTime, RelationshipType.SessionResultHasLapTime],
                [RelationshipTypeNeo4j.SessionResultHasImage, RelationshipType.SessionResultHasImage],
                [RelationshipTypeNeo4j.SessionResultHasPrimeImage, RelationshipType.SessionResultHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.LapTime, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.LapTimeBelongsToSessionResult, RelationshipType.LapTimeBelongsToSessionResult],
                [RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout],
                [RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.LapTimeHasImage, RelationshipType.LapTimeHasImage],
                [RelationshipTypeNeo4j.LapTimeHasPrimeImage, RelationshipType.LapTimeHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.RacingGame, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant],
                [RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout, RelationshipType.RacingGameFeaturesTrackLayout],
                [RelationshipTypeNeo4j.RacingGameHasImage, RelationshipType.RacingGameHasImage],
                [RelationshipTypeNeo4j.RacingGameHasPrimeImage, RelationshipType.RacingGameHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.GamingPlatform, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([])],
            [RelationshipDirection.FORWARD, new Map([
                [RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame, RelationshipType.GamingPlatformFeaturesRacingGame],
                [RelationshipTypeNeo4j.GamingPlatformHasImage, RelationshipType.GamingPlatformHasImage],
                [RelationshipTypeNeo4j.GamingPlatformHasPrimeImage, RelationshipType.GamingPlatformHasPrimeImage],
            ])],
        ])],
        [Neo4jNodeType.Magazine, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                // Magazine - Reverse
            ])],
            [RelationshipDirection.FORWARD, new Map([
                // Magazine - Forward
                [RelationshipTypeNeo4j.MagazineHasPrimeImage, RelationshipType.MagazineHasPrimeImage],
                [RelationshipTypeNeo4j.MagazineHasImage, RelationshipType.MagazineHasImage],
            ])],
        ])],
        [Neo4jNodeType.Image, new Map<RelationshipDirection, Map<RelationshipTypeNeo4j, RelationshipType>>([
            [RelationshipDirection.REVERSE, new Map([
                [RelationshipTypeNeo4j.ImageBelongsToNode, RelationshipType.ImageBelongsToNode],
                [RelationshipTypeNeo4j.ImageIsPrimeImageOfNode, RelationshipType.ImageIsPrimeImageOfNode],
            ])],
            [RelationshipDirection.FORWARD, new Map([
                //
            ])],
        ])],
    ])

    const dbRelationshipType = mapping.get(startNodeLabel)?.get(relationshipDirection)?.get(neo4jRelationshipType)

    if (!dbRelationshipType) {
        throw new RelationshipTypeNotFoundError(neo4jRelationshipType)
    }

    return dbRelationshipType
}
