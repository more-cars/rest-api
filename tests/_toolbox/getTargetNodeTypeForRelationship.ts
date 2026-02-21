import {ControllerNodeType} from "../../src/controllers/nodes/types/ControllerNodeType"
import {RelType} from "../../src/models/relationships/types/RelType"
import {snakeCase} from "change-case"

export function getTargetNodeTypeForRelationship(startNodeType: ControllerNodeType, relationshipName: string) {
    const relationships = new Map<ControllerNodeType, Map<RelType, ControllerNodeType>>()
    relationshipName = snakeCase(startNodeType + ' ' + relationshipName)

    relationships.set(
        ControllerNodeType.Image, new Map([
            [RelType.ImageBelongsToNode, ControllerNodeType.Company],
            [RelType.ImageBelongsToNode, ControllerNodeType.Brand],
            [RelType.ImageBelongsToNode, ControllerNodeType.CarModel],
            [RelType.ImageBelongsToNode, ControllerNodeType.CarModelVariant],
            [RelType.ImageBelongsToNode, ControllerNodeType.RaceTrack],
            [RelType.ImageBelongsToNode, ControllerNodeType.TrackLayout],
            [RelType.ImageBelongsToNode, ControllerNodeType.RacingSeries],
            [RelType.ImageBelongsToNode, ControllerNodeType.RacingEvent],
            [RelType.ImageBelongsToNode, ControllerNodeType.RacingSession],
            [RelType.ImageBelongsToNode, ControllerNodeType.SessionResult],
            [RelType.ImageBelongsToNode, ControllerNodeType.LapTime],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.Company],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.Brand],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.CarModel],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.CarModelVariant],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RaceTrack],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.TrackLayout],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RacingSeries],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RacingEvent],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RacingSession],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.SessionResult],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.LapTime],
        ]))

    relationships.set(
        ControllerNodeType.Company, new Map([
            [RelType.CompanyHasBrand, ControllerNodeType.Brand],
            [RelType.CompanyHasImage, ControllerNodeType.Image],
            [RelType.CompanyHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.Brand, new Map([
            [RelType.BrandBelongsToCompany, ControllerNodeType.Company],
            [RelType.BrandHasCarModel, ControllerNodeType.CarModel],
            [RelType.BrandHasImage, ControllerNodeType.Image],
            [RelType.BrandHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.CarModel, new Map([
            [RelType.CarModelBelongsToBrand, ControllerNodeType.Brand],
            [RelType.CarModelHasSuccessor, ControllerNodeType.CarModel],
            [RelType.CarModelIsSuccessorOf, ControllerNodeType.CarModel],
            [RelType.CarModelHasVariant, ControllerNodeType.CarModelVariant],
            [RelType.CarModelHasImage, ControllerNodeType.Image],
            [RelType.CarModelHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.CarModelVariant, new Map([
            [RelType.CarModelVariantIsVariantOf, ControllerNodeType.CarModel],
            [RelType.CarModelVariantAchievedSessionResult, ControllerNodeType.SessionResult],
            [RelType.CarModelVariantAchievedLapTime, ControllerNodeType.LapTime],
            [RelType.CarModelVariantIsFeaturedInRacingGame, ControllerNodeType.RacingGame],
            [RelType.CarModelVariantHasImage, ControllerNodeType.Image],
            [RelType.CarModelVariantHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.RaceTrack, new Map([
            [RelType.RaceTrackHasLayout, ControllerNodeType.TrackLayout],
            [RelType.RaceTrackHostedRacingEvent, ControllerNodeType.RacingEvent],
            [RelType.RaceTrackHasImage, ControllerNodeType.Image],
            [RelType.RaceTrackHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.TrackLayout, new Map([
            [RelType.TrackLayoutBelongsToRaceTrack, ControllerNodeType.RaceTrack],
            [RelType.TrackLayoutWasUsedByRacingEvent, ControllerNodeType.RacingEvent],
            [RelType.TrackLayoutHasLapTime, ControllerNodeType.LapTime],
            [RelType.TrackLayoutIsFeaturedInRacingGame, ControllerNodeType.RacingGame],
            [RelType.TrackLayoutHasImage, ControllerNodeType.Image],
            [RelType.TrackLayoutHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.RacingSeries, new Map([
            [RelType.RacingSeriesHasRacingEvent, ControllerNodeType.RacingEvent],
            [RelType.RacingSeriesHasImage, ControllerNodeType.Image],
            [RelType.RacingSeriesHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.RacingEvent, new Map([
            [RelType.RacingEventBelongsToRacingSeries, ControllerNodeType.RacingSeries],
            [RelType.RacingEventFollowsEvent, ControllerNodeType.RacingEvent],
            [RelType.RacingEventIsFollowedByEvent, ControllerNodeType.RacingEvent],
            [RelType.RacingEventTookPlaceAtRaceTrack, ControllerNodeType.RaceTrack],
            [RelType.RacingEventUsedTheTrackLayout, ControllerNodeType.TrackLayout],
            [RelType.RacingEventHasRacingSession, ControllerNodeType.RacingSession],
            [RelType.RacingEventHasImage, ControllerNodeType.Image],
            [RelType.RacingEventHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.RacingSession, new Map([
            [RelType.RacingSessionBelongsToRacingEvent, ControllerNodeType.RacingEvent],
            [RelType.RacingSessionHasSessionResult, ControllerNodeType.SessionResult],
            [RelType.RacingSessionHasImage, ControllerNodeType.Image],
            [RelType.RacingSessionHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.SessionResult, new Map([
            [RelType.SessionResultBelongsToRacingSession, ControllerNodeType.RacingSession],
            [RelType.SessionResultHasLapTime, ControllerNodeType.LapTime],
            [RelType.SessionResultAchievedWithCarModelVariant, ControllerNodeType.CarModelVariant],
            [RelType.SessionResultHasImage, ControllerNodeType.Image],
            [RelType.SessionResultHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.LapTime, new Map([
            [RelType.LapTimeBelongsToSessionResult, ControllerNodeType.SessionResult],
            [RelType.LapTimeAchievedOnTrackLayout, ControllerNodeType.TrackLayout],
            [RelType.LapTimeAchievedWithCarModelVariant, ControllerNodeType.CarModelVariant],
            [RelType.LapTimeHasImage, ControllerNodeType.Image],
            [RelType.LapTimeHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.RacingGame, new Map([
            [RelType.RacingGameFeaturesCarModelVariant, ControllerNodeType.CarModelVariant],
            [RelType.RacingGameFeaturesTrackLayout, ControllerNodeType.TrackLayout],
            [RelType.RacingGameReleasedOnGamingPlatform, ControllerNodeType.GamingPlatform],
            [RelType.RacingGameHasImage, ControllerNodeType.Image],
            [RelType.RacingGameHasPrimeImage, ControllerNodeType.Image],
        ]))

    relationships.set(
        ControllerNodeType.GamingPlatform, new Map([
            [RelType.GamingPlatformFeaturesRacingGame, ControllerNodeType.RacingGame],
            [RelType.GamingPlatformHasImage, ControllerNodeType.Image],
            [RelType.GamingPlatformHasPrimeImage, ControllerNodeType.Image],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName as RelType)

    if (!match) {
        throw new Error(`TEST ERROR: No mapping found for relationship ${relationshipName}`)
    }

    return match
}
