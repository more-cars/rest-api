import {RelationshipType} from "../types/RelationshipType"
import {RelationshipTypeNeo4j} from "../types/RelationshipTypeNeo4j"
import {RelationshipTypeNotFoundError} from "../types/RelationshipTypeNotFoundError"

export function mapDbRelationshipTypeToNeo4jRelationshipType(
    relationshipType: RelationshipType,
): RelationshipTypeNeo4j {
    const mapping = new Map<RelationshipType, RelationshipTypeNeo4j>([
        [RelationshipType.CompanyHasBrand, RelationshipTypeNeo4j.CompanyHasBrand],
        [RelationshipType.CompanyHasImage, RelationshipTypeNeo4j.CompanyHasImage],
        [RelationshipType.CompanyHasPrimeImage, RelationshipTypeNeo4j.CompanyHasPrimeImage],
        [RelationshipType.BrandBelongsToCompany, RelationshipTypeNeo4j.BrandBelongsToCompany],
        [RelationshipType.BrandHasCarModel, RelationshipTypeNeo4j.BrandHasCarModel],
        [RelationshipType.BrandHasImage, RelationshipTypeNeo4j.BrandHasImage],
        [RelationshipType.BrandHasPrimeImage, RelationshipTypeNeo4j.BrandHasPrimeImage],
        [RelationshipType.CarModelBelongsToBrand, RelationshipTypeNeo4j.CarModelBelongsToBrand],
        [RelationshipType.CarModelIsSuccessorOf, RelationshipTypeNeo4j.CarModelIsSuccessorOf],
        [RelationshipType.CarModelHasSuccessor, RelationshipTypeNeo4j.CarModelHasSuccessor],
        [RelationshipType.CarModelHasVariant, RelationshipTypeNeo4j.CarModelHasVariant],
        [RelationshipType.CarModelHasImage, RelationshipTypeNeo4j.CarModelHasImage],
        [RelationshipType.CarModelHasPrimeImage, RelationshipTypeNeo4j.CarModelHasPrimeImage],
        [RelationshipType.CarModelVariantIsVariantOf, RelationshipTypeNeo4j.CarModelVariantIsVariantOf],
        [RelationshipType.CarModelVariantIsFeaturedInRacingGame, RelationshipTypeNeo4j.CarModelVariantIsFeaturedInRacingGame],
        [RelationshipType.CarModelVariantAchievedSessionResult, RelationshipTypeNeo4j.CarModelVariantAchievedSessionResult],
        [RelationshipType.CarModelVariantAchievedLapTime, RelationshipTypeNeo4j.CarModelVariantAchievedLapTime],
        [RelationshipType.CarModelVariantHasImage, RelationshipTypeNeo4j.CarModelVariantHasImage],
        [RelationshipType.CarModelVariantHasPrimeImage, RelationshipTypeNeo4j.CarModelVariantHasPrimeImage],
        [RelationshipType.RaceTrackHostedRacingEvent, RelationshipTypeNeo4j.RaceTrackHostedRacingEvent],
        [RelationshipType.RaceTrackHasLayout, RelationshipTypeNeo4j.RaceTrackHasLayout],
        [RelationshipType.RaceTrackHasImage, RelationshipTypeNeo4j.RaceTrackHasImage],
        [RelationshipType.RaceTrackHasPrimeImage, RelationshipTypeNeo4j.RaceTrackHasPrimeImage],
        [RelationshipType.TrackLayoutBelongsToRaceTrack, RelationshipTypeNeo4j.TrackLayoutBelongsToRaceTrack],
        [RelationshipType.TrackLayoutWasUsedByRacingEvent, RelationshipTypeNeo4j.TrackLayoutWasUsedByRacingEvent],
        [RelationshipType.TrackLayoutIsFeaturedInRacingGame, RelationshipTypeNeo4j.TrackLayoutIsFeaturedInRacingGame],
        [RelationshipType.TrackLayoutHasLapTime, RelationshipTypeNeo4j.TrackLayoutHasLapTime],
        [RelationshipType.TrackLayoutHasImage, RelationshipTypeNeo4j.TrackLayoutHasImage],
        [RelationshipType.TrackLayoutHasPrimeImage, RelationshipTypeNeo4j.TrackLayoutHasPrimeImage],
        [RelationshipType.RacingSeriesHasRacingEvent, RelationshipTypeNeo4j.RacingSeriesHasRacingEvent],
        [RelationshipType.RacingSeriesHasImage, RelationshipTypeNeo4j.RacingSeriesHasImage],
        [RelationshipType.RacingSeriesHasPrimeImage, RelationshipTypeNeo4j.RacingSeriesHasPrimeImage],
        [RelationshipType.RacingEventBelongsToRacingSeries, RelationshipTypeNeo4j.RacingEventBelongsToRacingSeries],
        [RelationshipType.RacingEventFollowsEvent, RelationshipTypeNeo4j.RacingEventFollowsEvent],
        [RelationshipType.RacingEventIsFollowedByEvent, RelationshipTypeNeo4j.RacingEventIsFollowedByEvent],
        [RelationshipType.RacingEventTookPlaceAtRaceTrack, RelationshipTypeNeo4j.RacingEventTookPlaceAtRaceTrack],
        [RelationshipType.RacingEventUsedTheTrackLayout, RelationshipTypeNeo4j.RacingEventUsedTheTrackLayout],
        [RelationshipType.RacingEventHasRacingSession, RelationshipTypeNeo4j.RacingEventHasRacingSession],
        [RelationshipType.RacingEventHasImage, RelationshipTypeNeo4j.RacingEventHasImage],
        [RelationshipType.RacingEventHasPrimeImage, RelationshipTypeNeo4j.RacingEventHasPrimeImage],
        [RelationshipType.RacingSessionBelongsToRacingEvent, RelationshipTypeNeo4j.RacingSessionBelongsToRacingEvent],
        [RelationshipType.RacingSessionHasSessionResult, RelationshipTypeNeo4j.RacingSessionHasSessionResult],
        [RelationshipType.RacingSessionHasImage, RelationshipTypeNeo4j.RacingSessionHasImage],
        [RelationshipType.RacingSessionHasPrimeImage, RelationshipTypeNeo4j.RacingSessionHasPrimeImage],
        [RelationshipType.SessionResultBelongsToRacingSession, RelationshipTypeNeo4j.SessionResultBelongsToRacingSession],
        [RelationshipType.SessionResultAchievedWithCarModelVariant, RelationshipTypeNeo4j.SessionResultAchievedWithCarModelVariant],
        [RelationshipType.SessionResultHasLapTime, RelationshipTypeNeo4j.SessionResultHasLapTime],
        [RelationshipType.SessionResultHasImage, RelationshipTypeNeo4j.SessionResultHasImage],
        [RelationshipType.SessionResultHasPrimeImage, RelationshipTypeNeo4j.SessionResultHasPrimeImage],
        [RelationshipType.LapTimeBelongsToSessionResult, RelationshipTypeNeo4j.LapTimeBelongsToSessionResult],
        [RelationshipType.LapTimeAchievedOnTrackLayout, RelationshipTypeNeo4j.LapTimeAchievedOnTrackLayout],
        [RelationshipType.LapTimeAchievedWithCarModelVariant, RelationshipTypeNeo4j.LapTimeAchievedWithCarModelVariant],
        [RelationshipType.LapTimeHasImage, RelationshipTypeNeo4j.LapTimeHasImage],
        [RelationshipType.LapTimeHasPrimeImage, RelationshipTypeNeo4j.LapTimeHasPrimeImage],
        [RelationshipType.RacingGameReleasedOnGamingPlatform, RelationshipTypeNeo4j.RacingGameReleasedOnGamingPlatform],
        [RelationshipType.RacingGameFeaturesCarModelVariant, RelationshipTypeNeo4j.RacingGameFeaturesCarModelVariant],
        [RelationshipType.RacingGameFeaturesTrackLayout, RelationshipTypeNeo4j.RacingGameFeaturesTrackLayout],
        [RelationshipType.RacingGameHasImage, RelationshipTypeNeo4j.RacingGameHasImage],
        [RelationshipType.RacingGameHasPrimeImage, RelationshipTypeNeo4j.RacingGameHasPrimeImage],
        [RelationshipType.GamingPlatformFeaturesRacingGame, RelationshipTypeNeo4j.GamingPlatformFeaturesRacingGame],
        [RelationshipType.GamingPlatformHasImage, RelationshipTypeNeo4j.GamingPlatformHasImage],
        [RelationshipType.GamingPlatformHasPrimeImage, RelationshipTypeNeo4j.GamingPlatformHasPrimeImage],
        [RelationshipType.ImageBelongsToNode, RelationshipTypeNeo4j.ImageBelongsToNode],
        [RelationshipType.ImageIsPrimeImageOfNode, RelationshipTypeNeo4j.ImageIsPrimeImageOfNode],
        [RelationshipType.MagazineHasImage, RelationshipTypeNeo4j.MagazineHasImage],
        [RelationshipType.NodeHasImage, RelationshipTypeNeo4j.NodeHasImage],
        [RelationshipType.NodeHasPrimeImage, RelationshipTypeNeo4j.NodeHasPrimeImage],
    ])

    const dbRelationshipType = mapping.get(relationshipType)

    if (!dbRelationshipType) {
        throw new RelationshipTypeNotFoundError(relationshipType)
    }

    return dbRelationshipType
}
