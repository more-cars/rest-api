import {RelType} from "../../models/relationships/types/RelType"
import {RelationType} from "../types/RelationType"
import {RelationTypeNotFoundError} from "../types/RelationTypeNotFoundError"

export function mapModelRelationTypeToControllerRelationType(modelRelationshipType: RelType): RelationType {
    const mapping = new Map<RelType, RelationType>([
        [RelType.CompanyHasBrand, RelationType.CompanyHasBrand],
        [RelType.CompanyHasImage, RelationType.CompanyHasImage],
        [RelType.CompanyHasPrimeImage, RelationType.CompanyHasPrimeImage],
        [RelType.BrandBelongsToCompany, RelationType.BrandBelongsToCompany],
        [RelType.BrandHasCarModel, RelationType.BrandHasCarModel],
        [RelType.BrandHasImage, RelationType.BrandHasImage],
        [RelType.BrandHasPrimeImage, RelationType.BrandHasPrimeImage],
        [RelType.CarModelBelongsToBrand, RelationType.CarModelBelongsToBrand],
        [RelType.CarModelHasSuccessor, RelationType.CarModelHasSuccessor],
        [RelType.CarModelIsSuccessorOf, RelationType.CarModelIsSuccessorOf],
        [RelType.CarModelHasVariant, RelationType.CarModelHasVariant],
        [RelType.CarModelHasImage, RelationType.CarModelHasImage],
        [RelType.CarModelHasPrimeImage, RelationType.CarModelHasPrimeImage],
        [RelType.CarModelVariantIsVariantOf, RelationType.CarModelVariantIsVariantOf],
        [RelType.CarModelVariantAchievedSessionResult, RelationType.CarModelVariantAchievedSessionResult],
        [RelType.CarModelVariantAchievedLapTime, RelationType.CarModelVariantAchievedLapTime],
        [RelType.CarModelVariantIsFeaturedInRacingGame, RelationType.CarModelVariantIsFeaturedInRacingGame],
        [RelType.CarModelVariantHasImage, RelationType.CarModelVariantHasImage],
        [RelType.CarModelVariantHasPrimeImage, RelationType.CarModelVariantHasPrimeImage],
        [RelType.RaceTrackHasLayout, RelationType.RaceTrackHasLayout],
        [RelType.RaceTrackHostedRacingEvent, RelationType.RaceTrackHostedRacingEvent],
        [RelType.RaceTrackHasImage, RelationType.RaceTrackHasImage],
        [RelType.RaceTrackHasPrimeImage, RelationType.RaceTrackHasPrimeImage],
        [RelType.TrackLayoutBelongsToRaceTrack, RelationType.TrackLayoutBelongsToRaceTrack],
        [RelType.TrackLayoutWasUsedByRacingEvent, RelationType.TrackLayoutWasUsedByRacingEvent],
        [RelType.TrackLayoutHasLapTime, RelationType.TrackLayoutHasLapTime],
        [RelType.TrackLayoutIsFeaturedInRacingGame, RelationType.TrackLayoutIsFeaturedInRacingGame],
        [RelType.TrackLayoutHasImage, RelationType.TrackLayoutHasImage],
        [RelType.TrackLayoutHasPrimeImage, RelationType.TrackLayoutHasPrimeImage],
        [RelType.RacingSeriesHasRacingEvent, RelationType.RacingSeriesHasRacingEvent],
        [RelType.RacingSeriesHasImage, RelationType.RacingSeriesHasImage],
        [RelType.RacingSeriesHasPrimeImage, RelationType.RacingSeriesHasPrimeImage],
        [RelType.RacingEventBelongsToRacingSeries, RelationType.RacingEventBelongsToRacingSeries],
        [RelType.RacingEventIsFollowedByEvent, RelationType.RacingEventIsFollowedByEvent],
        [RelType.RacingEventFollowsEvent, RelationType.RacingEventFollowsEvent],
        [RelType.RacingEventTookPlaceAtRaceTrack, RelationType.RacingEventTookPlaceAtRaceTrack],
        [RelType.RacingEventUsedTheTrackLayout, RelationType.RacingEventUsedTheTrackLayout],
        [RelType.RacingEventHasRacingSession, RelationType.RacingEventHasRacingSession],
        [RelType.RacingEventHasImage, RelationType.RacingEventHasImage],
        [RelType.RacingEventHasPrimeImage, RelationType.RacingEventHasPrimeImage],
        [RelType.RacingSessionBelongsToRacingEvent, RelationType.RacingSessionBelongsToRacingEvent],
        [RelType.RacingSessionHasSessionResult, RelationType.RacingSessionHasSessionResult],
        [RelType.RacingSessionHasImage, RelationType.RacingSessionHasImage],
        [RelType.RacingSessionHasPrimeImage, RelationType.RacingSessionHasPrimeImage],
        [RelType.SessionResultBelongsToRacingSession, RelationType.SessionResultBelongsToRacingSession],
        [RelType.SessionResultHasLapTime, RelationType.SessionResultHasLapTime],
        [RelType.SessionResultAchievedWithCarModelVariant, RelationType.SessionResultAchievedWithCarModelVariant],
        [RelType.SessionResultHasImage, RelationType.SessionResultHasImage],
        [RelType.SessionResultHasPrimeImage, RelationType.SessionResultHasPrimeImage],
        [RelType.LapTimeBelongsToSessionResult, RelationType.LapTimeBelongsToSessionResult],
        [RelType.LapTimeAchievedOnTrackLayout, RelationType.LapTimeAchievedOnTrackLayout],
        [RelType.LapTimeAchievedWithCarModelVariant, RelationType.LapTimeAchievedWithCarModelVariant],
        [RelType.LapTimeHasImage, RelationType.LapTimeHasImage],
        [RelType.LapTimeHasPrimeImage, RelationType.LapTimeHasPrimeImage],
        [RelType.RacingGameFeaturesCarModelVariant, RelationType.RacingGameFeaturesCarModelVariant],
        [RelType.RacingGameFeaturesTrackLayout, RelationType.RacingGameFeaturesTrackLayout],
        [RelType.RacingGameReleasedOnGamingPlatform, RelationType.RacingGameReleasedOnGamingPlatform],
        [RelType.RacingGameHasImage, RelationType.RacingGameHasImage],
        [RelType.RacingGameHasPrimeImage, RelationType.RacingGameHasPrimeImage],
        [RelType.GamingPlatformFeaturesRacingGame, RelationType.GamingPlatformFeaturesRacingGame],
        [RelType.GamingPlatformHasImage, RelationType.GamingPlatformHasImage],
        [RelType.GamingPlatformHasPrimeImage, RelationType.GamingPlatformHasPrimeImage],
        [RelType.ImageBelongsToNode, RelationType.ImageBelongsToNode],
        [RelType.MagazineHasImage, RelationType.MagazineHasImage],
        [RelType.MagazineHasPrimeImage, RelationType.MagazineHasPrimeImage],
        [RelType.ImageIsPrimeImageOfNode, RelationType.ImageIsPrimeImageOfNode],
    ])

    const mappedRel = mapping.get(modelRelationshipType)

    if (!mappedRel) {
        throw new RelationTypeNotFoundError(modelRelationshipType)
    }

    return mappedRel
}
