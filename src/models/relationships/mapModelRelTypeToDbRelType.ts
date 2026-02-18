import {RelType} from "./types/RelType"
import {RelationshipType} from "../../db/types/RelationshipType"
import {RelTypeNotFoundError} from "../types/RelTypeNotFoundError"

export function mapModelRelTypeToDbRelType(relationshipType: RelType): RelationshipType {
    const mapping = new Map<RelType, RelationshipType>([
        [RelType.CompanyHasBrand, RelationshipType.CompanyHasBrand],
        [RelType.CompanyHasImage, RelationshipType.CompanyHasImage],
        [RelType.CompanyHasPrimeImage, RelationshipType.CompanyHasPrimeImage],
        [RelType.BrandBelongsToCompany, RelationshipType.BrandBelongsToCompany],
        [RelType.BrandHasCarModel, RelationshipType.BrandHasCarModel],
        [RelType.BrandHasImage, RelationshipType.BrandHasImage],
        [RelType.BrandHasPrimeImage, RelationshipType.BrandHasPrimeImage],
        [RelType.CarModelBelongsToBrand, RelationshipType.CarModelBelongsToBrand],
        [RelType.CarModelHasSuccessor, RelationshipType.CarModelHasSuccessor],
        [RelType.CarModelIsSuccessorOf, RelationshipType.CarModelIsSuccessorOf],
        [RelType.CarModelHasVariant, RelationshipType.CarModelHasVariant],
        [RelType.CarModelHasImage, RelationshipType.CarModelHasImage],
        [RelType.CarModelHasPrimeImage, RelationshipType.CarModelHasPrimeImage],
        [RelType.CarModelVariantIsVariantOf, RelationshipType.CarModelVariantIsVariantOf],
        [RelType.CarModelVariantAchievedSessionResult, RelationshipType.CarModelVariantAchievedSessionResult],
        [RelType.CarModelVariantAchievedLapTime, RelationshipType.CarModelVariantAchievedLapTime],
        [RelType.CarModelVariantIsFeaturedInRacingGame, RelationshipType.CarModelVariantIsFeaturedInRacingGame],
        [RelType.CarModelVariantHasImage, RelationshipType.CarModelVariantHasImage],
        [RelType.CarModelVariantHasPrimeImage, RelationshipType.CarModelVariantHasPrimeImage],
        [RelType.RaceTrackHasLayout, RelationshipType.RaceTrackHasLayout],
        [RelType.RaceTrackHostedRacingEvent, RelationshipType.RaceTrackHostedRacingEvent],
        [RelType.RaceTrackHasImage, RelationshipType.RaceTrackHasImage],
        [RelType.RaceTrackHasPrimeImage, RelationshipType.RaceTrackHasPrimeImage],
        [RelType.TrackLayoutBelongsToRaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack],
        [RelType.TrackLayoutWasUsedByRacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent],
        [RelType.TrackLayoutHasLapTime, RelationshipType.TrackLayoutHasLapTime],
        [RelType.TrackLayoutIsFeaturedInRacingGame, RelationshipType.TrackLayoutIsFeaturedInRacingGame],
        [RelType.TrackLayoutHasImage, RelationshipType.TrackLayoutHasImage],
        [RelType.TrackLayoutHasPrimeImage, RelationshipType.TrackLayoutHasPrimeImage],
        [RelType.RacingSeriesHasRacingEvent, RelationshipType.RacingSeriesHasRacingEvent],
        [RelType.RacingSeriesHasImage, RelationshipType.RacingSeriesHasImage],
        [RelType.RacingSeriesHasPrimeImage, RelationshipType.RacingSeriesHasPrimeImage],
        [RelType.RacingEventBelongsToRacingSeries, RelationshipType.RacingEventBelongsToRacingSeries],
        [RelType.RacingEventIsFollowedByEvent, RelationshipType.RacingEventIsFollowedByEvent],
        [RelType.RacingEventFollowsEvent, RelationshipType.RacingEventFollowsEvent],
        [RelType.RacingEventTookPlaceAtRaceTrack, RelationshipType.RacingEventTookPlaceAtRaceTrack],
        [RelType.RacingEventUsedTheTrackLayout, RelationshipType.RacingEventUsedTheTrackLayout],
        [RelType.RacingEventHasRacingSession, RelationshipType.RacingEventHasRacingSession],
        [RelType.RacingEventHasImage, RelationshipType.RacingEventHasImage],
        [RelType.RacingEventHasPrimeImage, RelationshipType.RacingEventHasPrimeImage],
        [RelType.RacingSessionBelongsToRacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent],
        [RelType.RacingSessionHasSessionResult, RelationshipType.RacingSessionHasSessionResult],
        [RelType.RacingSessionHasImage, RelationshipType.RacingSessionHasImage],
        [RelType.RacingSessionHasPrimeImage, RelationshipType.RacingSessionHasPrimeImage],
        [RelType.SessionResultBelongsToRacingSession, RelationshipType.SessionResultBelongsToRacingSession],
        [RelType.SessionResultHasLapTime, RelationshipType.SessionResultHasLapTime],
        [RelType.SessionResultAchievedWithCarModelVariant, RelationshipType.SessionResultAchievedWithCarModelVariant],
        [RelType.SessionResultHasImage, RelationshipType.SessionResultHasImage],
        [RelType.SessionResultHasPrimeImage, RelationshipType.SessionResultHasPrimeImage],
        [RelType.LapTimeBelongsToSessionResult, RelationshipType.LapTimeBelongsToSessionResult],
        [RelType.LapTimeAchievedOnTrackLayout, RelationshipType.LapTimeAchievedOnTrackLayout],
        [RelType.LapTimeAchievedWithCarModelVariant, RelationshipType.LapTimeAchievedWithCarModelVariant],
        [RelType.LapTimeHasImage, RelationshipType.LapTimeHasImage],
        [RelType.LapTimeHasPrimeImage, RelationshipType.LapTimeHasPrimeImage],
        [RelType.RacingGameFeaturesCarModelVariant, RelationshipType.RacingGameFeaturesCarModelVariant],
        [RelType.RacingGameFeaturesTrackLayout, RelationshipType.RacingGameFeaturesTrackLayout],
        [RelType.RacingGameReleasedOnGamingPlatform, RelationshipType.RacingGameReleasedOnGamingPlatform],
        [RelType.RacingGameHasImage, RelationshipType.RacingGameHasImage],
        [RelType.RacingGameHasPrimeImage, RelationshipType.RacingGameHasPrimeImage],
        [RelType.GamingPlatformFeaturesRacingGame, RelationshipType.GamingPlatformFeaturesRacingGame],
        [RelType.GamingPlatformHasImage, RelationshipType.GamingPlatformHasImage],
        [RelType.GamingPlatformHasPrimeImage, RelationshipType.GamingPlatformHasPrimeImage],
        [RelType.ImageBelongsToNode, RelationshipType.ImageBelongsToNode],
        [RelType.ImageIsPrimeImageOfNode, RelationshipType.ImageIsPrimeImageOfNode],
    ])

    const mappedRel = mapping.get(relationshipType)

    if (!mappedRel) {
        throw new RelTypeNotFoundError(relationshipType)
    }

    return mappedRel
}
