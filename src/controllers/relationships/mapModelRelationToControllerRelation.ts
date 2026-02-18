import {RelationshipType} from "../../models/relationships/types/RelationshipType"
import {RelationType} from "./types/RelationType"
import {RelationTypeNotFoundError} from "./types/RelationTypeNotFoundError"

export function mapModelRelationToControllerRelation(modelRelationshipType: RelationshipType): RelationType {
    const mapping = new Map<RelationshipType, RelationType>([
        [RelationshipType.CompanyHasBrand, RelationType.CompanyHasBrand],
        [RelationshipType.CompanyHasImage, RelationType.CompanyHasImage],
        [RelationshipType.CompanyHasPrimeImage, RelationType.CompanyHasPrimeImage],
        [RelationshipType.BrandBelongsToCompany, RelationType.BrandBelongsToCompany],
        [RelationshipType.BrandHasCarModel, RelationType.BrandHasCarModel],
        [RelationshipType.BrandHasImage, RelationType.BrandHasImage],
        [RelationshipType.BrandHasPrimeImage, RelationType.BrandHasPrimeImage],
        [RelationshipType.CarModelBelongsToBrand, RelationType.CarModelBelongsToBrand],
        [RelationshipType.CarModelHasSuccessor, RelationType.CarModelHasSuccessor],
        [RelationshipType.CarModelIsSuccessorOf, RelationType.CarModelIsSuccessorOf],
        [RelationshipType.CarModelHasVariant, RelationType.CarModelHasVariant],
        [RelationshipType.CarModelHasImage, RelationType.CarModelHasImage],
        [RelationshipType.CarModelHasPrimeImage, RelationType.CarModelHasPrimeImage],
        [RelationshipType.CarModelVariantIsVariantOf, RelationType.CarModelVariantIsVariantOf],
        [RelationshipType.CarModelVariantAchievedSessionResult, RelationType.CarModelVariantAchievedSessionResult],
        [RelationshipType.CarModelVariantAchievedLapTime, RelationType.CarModelVariantAchievedLapTime],
        [RelationshipType.CarModelVariantIsFeaturedInRacingGame, RelationType.CarModelVariantIsFeaturedInRacingGame],
        [RelationshipType.CarModelVariantHasImage, RelationType.CarModelVariantHasImage],
        [RelationshipType.CarModelVariantHasPrimeImage, RelationType.CarModelVariantHasPrimeImage],
        [RelationshipType.RaceTrackHasLayout, RelationType.RaceTrackHasLayout],
        [RelationshipType.RaceTrackHostedRacingEvent, RelationType.RaceTrackHostedRacingEvent],
        [RelationshipType.RaceTrackHasImage, RelationType.RaceTrackHasImage],
        [RelationshipType.RaceTrackHasPrimeImage, RelationType.RaceTrackHasPrimeImage],
        [RelationshipType.TrackLayoutBelongsToRaceTrack, RelationType.TrackLayoutBelongsToRaceTrack],
        [RelationshipType.TrackLayoutWasUsedByRacingEvent, RelationType.TrackLayoutWasUsedByRacingEvent],
        [RelationshipType.TrackLayoutHasLapTime, RelationType.TrackLayoutHasLapTime],
        [RelationshipType.TrackLayoutIsFeaturedInRacingGame, RelationType.TrackLayoutIsFeaturedInRacingGame],
        [RelationshipType.TrackLayoutHasImage, RelationType.TrackLayoutHasImage],
        [RelationshipType.TrackLayoutHasPrimeImage, RelationType.TrackLayoutHasPrimeImage],
        [RelationshipType.RacingSeriesHasRacingEvent, RelationType.RacingSeriesHasRacingEvent],
        [RelationshipType.RacingSeriesHasImage, RelationType.RacingSeriesHasImage],
        [RelationshipType.RacingSeriesHasPrimeImage, RelationType.RacingSeriesHasPrimeImage],
        [RelationshipType.RacingEventBelongsToRacingSeries, RelationType.RacingEventBelongsToRacingSeries],
        [RelationshipType.RacingEventIsFollowedByEvent, RelationType.RacingEventIsFollowedByEvent],
        [RelationshipType.RacingEventFollowsEvent, RelationType.RacingEventFollowsEvent],
        [RelationshipType.RacingEventTookPlaceAtRaceTrack, RelationType.RacingEventTookPlaceAtRaceTrack],
        [RelationshipType.RacingEventUsedTheTrackLayout, RelationType.RacingEventUsedTheTrackLayout],
        [RelationshipType.RacingEventHasRacingSession, RelationType.RacingEventHasRacingSession],
        [RelationshipType.RacingEventHasImage, RelationType.RacingEventHasImage],
        [RelationshipType.RacingEventHasPrimeImage, RelationType.RacingEventHasPrimeImage],
        [RelationshipType.RacingSessionBelongsToRacingEvent, RelationType.RacingSessionBelongsToRacingEvent],
        [RelationshipType.RacingSessionHasSessionResult, RelationType.RacingSessionHasSessionResult],
        [RelationshipType.RacingSessionHasImage, RelationType.RacingSessionHasImage],
        [RelationshipType.RacingSessionHasPrimeImage, RelationType.RacingSessionHasPrimeImage],
        [RelationshipType.SessionResultBelongsToRacingSession, RelationType.SessionResultBelongsToRacingSession],
        [RelationshipType.SessionResultHasLapTime, RelationType.SessionResultHasLapTime],
        [RelationshipType.SessionResultAchievedWithCarModelVariant, RelationType.SessionResultAchievedWithCarModelVariant],
        [RelationshipType.SessionResultHasImage, RelationType.SessionResultHasImage],
        [RelationshipType.SessionResultHasPrimeImage, RelationType.SessionResultHasPrimeImage],
        [RelationshipType.LapTimeBelongsToSessionResult, RelationType.LapTimeBelongsToSessionResult],
        [RelationshipType.LapTimeAchievedOnTrackLayout, RelationType.LapTimeAchievedOnTrackLayout],
        [RelationshipType.LapTimeAchievedWithCarModelVariant, RelationType.LapTimeAchievedWithCarModelVariant],
        [RelationshipType.LapTimeHasImage, RelationType.LapTimeHasImage],
        [RelationshipType.LapTimeHasPrimeImage, RelationType.LapTimeHasPrimeImage],
        [RelationshipType.RacingGameFeaturesCarModelVariant, RelationType.RacingGameFeaturesCarModelVariant],
        [RelationshipType.RacingGameFeaturesTrackLayout, RelationType.RacingGameFeaturesTrackLayout],
        [RelationshipType.RacingGameReleasedOnGamingPlatform, RelationType.RacingGameReleasedOnGamingPlatform],
        [RelationshipType.RacingGameHasImage, RelationType.RacingGameHasImage],
        [RelationshipType.RacingGameHasPrimeImage, RelationType.RacingGameHasPrimeImage],
        [RelationshipType.GamingPlatformFeaturesRacingGame, RelationType.GamingPlatformFeaturesRacingGame],
        [RelationshipType.GamingPlatformHasImage, RelationType.GamingPlatformHasImage],
        [RelationshipType.GamingPlatformHasPrimeImage, RelationType.GamingPlatformHasPrimeImage],
        [RelationshipType.ImageBelongsToNode, RelationType.ImageBelongsToNode],
        [RelationshipType.ImageIsPrimeImageOfNode, RelationType.ImageIsPrimeImageOfNode],
    ])

    const mappedRel = mapping.get(modelRelationshipType)

    if (!mappedRel) {
        throw new RelationTypeNotFoundError(modelRelationshipType)
    }

    return mappedRel
}
