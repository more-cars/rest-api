import {ControllerNodeType} from "../../src/controllers/nodes/types/ControllerNodeType"
import {RelType} from "../../src/models/relationships/types/RelType"
import {snakeCase} from "change-case"

export function getTargetNodeTypeForRelationship(startNodeType: ControllerNodeType, relationshipName: string) {
    const relationships = new Map<ControllerNodeType, Map<RelType, ControllerNodeType>>()
    relationshipName = snakeCase(startNodeType + ' ' + relationshipName)

    relationships.set(
        ControllerNodeType.IMAGE, new Map([
            [RelType.ImageBelongsToNode, ControllerNodeType.COMPANY],
            [RelType.ImageBelongsToNode, ControllerNodeType.BRAND],
            [RelType.ImageBelongsToNode, ControllerNodeType.CAR_MODEL],
            [RelType.ImageBelongsToNode, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.ImageBelongsToNode, ControllerNodeType.RACE_TRACK],
            [RelType.ImageBelongsToNode, ControllerNodeType.TRACK_LAYOUT],
            [RelType.ImageBelongsToNode, ControllerNodeType.RACING_SERIES],
            [RelType.ImageBelongsToNode, ControllerNodeType.RACING_EVENT],
            [RelType.ImageBelongsToNode, ControllerNodeType.RACING_SESSION],
            [RelType.ImageBelongsToNode, ControllerNodeType.SESSION_RESULT],
            [RelType.ImageBelongsToNode, ControllerNodeType.LAP_TIME],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.COMPANY],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.BRAND],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.CAR_MODEL],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RACE_TRACK],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.TRACK_LAYOUT],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RACING_SERIES],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RACING_EVENT],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.RACING_SESSION],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.SESSION_RESULT],
            [RelType.ImageIsPrimeImageOfNode, ControllerNodeType.LAP_TIME],
        ]))

    relationships.set(
        ControllerNodeType.COMPANY, new Map([
            [RelType.CompanyHasBrand, ControllerNodeType.BRAND],
            [RelType.CompanyHasImage, ControllerNodeType.IMAGE],
            [RelType.CompanyHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.BRAND, new Map([
            [RelType.BrandBelongsToCompany, ControllerNodeType.COMPANY],
            [RelType.BrandHasCarModel, ControllerNodeType.CAR_MODEL],
            [RelType.BrandHasImage, ControllerNodeType.IMAGE],
            [RelType.BrandHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.CAR_MODEL, new Map([
            [RelType.CarModelBelongsToBrand, ControllerNodeType.BRAND],
            [RelType.CarModelHasSuccessor, ControllerNodeType.CAR_MODEL],
            [RelType.CarModelIsSuccessorOf, ControllerNodeType.CAR_MODEL],
            [RelType.CarModelHasVariant, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.CarModelHasImage, ControllerNodeType.IMAGE],
            [RelType.CarModelHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.CAR_MODEL_VARIANT, new Map([
            [RelType.CarModelVariantIsVariantOf, ControllerNodeType.CAR_MODEL],
            [RelType.CarModelVariantAchievedSessionResult, ControllerNodeType.SESSION_RESULT],
            [RelType.CarModelVariantAchievedLapTime, ControllerNodeType.LAP_TIME],
            [RelType.CarModelVariantIsFeaturedInRacingGame, ControllerNodeType.RACING_GAME],
            [RelType.CarModelVariantHasImage, ControllerNodeType.IMAGE],
            [RelType.CarModelVariantHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.RACE_TRACK, new Map([
            [RelType.RaceTrackHasLayout, ControllerNodeType.TRACK_LAYOUT],
            [RelType.RaceTrackHostedRacingEvent, ControllerNodeType.RACING_EVENT],
            [RelType.RaceTrackHasImage, ControllerNodeType.IMAGE],
            [RelType.RaceTrackHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.TRACK_LAYOUT, new Map([
            [RelType.TrackLayoutBelongsToRaceTrack, ControllerNodeType.RACE_TRACK],
            [RelType.TrackLayoutWasUsedByRacingEvent, ControllerNodeType.RACING_EVENT],
            [RelType.TrackLayoutHasLapTime, ControllerNodeType.LAP_TIME],
            [RelType.TrackLayoutIsFeaturedInRacingGame, ControllerNodeType.RACING_GAME],
            [RelType.TrackLayoutHasImage, ControllerNodeType.IMAGE],
            [RelType.TrackLayoutHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.RACING_SERIES, new Map([
            [RelType.RacingSeriesHasRacingEvent, ControllerNodeType.RACING_EVENT],
            [RelType.RacingSeriesHasImage, ControllerNodeType.IMAGE],
            [RelType.RacingSeriesHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.RACING_EVENT, new Map([
            [RelType.RacingEventBelongsToRacingSeries, ControllerNodeType.RACING_SERIES],
            [RelType.RacingEventFollowsEvent, ControllerNodeType.RACING_EVENT],
            [RelType.RacingEventIsFollowedByEvent, ControllerNodeType.RACING_EVENT],
            [RelType.RacingEventTookPlaceAtRaceTrack, ControllerNodeType.RACE_TRACK],
            [RelType.RacingEventUsedTheTrackLayout, ControllerNodeType.TRACK_LAYOUT],
            [RelType.RacingEventHasRacingSession, ControllerNodeType.RACING_SESSION],
            [RelType.RacingEventHasImage, ControllerNodeType.IMAGE],
            [RelType.RacingEventHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.RACING_SESSION, new Map([
            [RelType.RacingSessionBelongsToRacingEvent, ControllerNodeType.RACING_EVENT],
            [RelType.RacingSessionHasSessionResult, ControllerNodeType.SESSION_RESULT],
            [RelType.RacingSessionHasImage, ControllerNodeType.IMAGE],
            [RelType.RacingSessionHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.SESSION_RESULT, new Map([
            [RelType.SessionResultBelongsToRacingSession, ControllerNodeType.RACING_SESSION],
            [RelType.SessionResultHasLapTime, ControllerNodeType.LAP_TIME],
            [RelType.SessionResultAchievedWithCarModelVariant, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.SessionResultHasImage, ControllerNodeType.IMAGE],
            [RelType.SessionResultHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.LAP_TIME, new Map([
            [RelType.LapTimeBelongsToSessionResult, ControllerNodeType.SESSION_RESULT],
            [RelType.LapTimeAchievedOnTrackLayout, ControllerNodeType.TRACK_LAYOUT],
            [RelType.LapTimeAchievedWithCarModelVariant, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.LapTimeHasImage, ControllerNodeType.IMAGE],
            [RelType.LapTimeHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.RACING_GAME, new Map([
            [RelType.RacingGameFeaturesCarModelVariant, ControllerNodeType.CAR_MODEL_VARIANT],
            [RelType.RacingGameFeaturesTrackLayout, ControllerNodeType.TRACK_LAYOUT],
            [RelType.RacingGameReleasedOnGamingPlatform, ControllerNodeType.GAMING_PLATFORM],
            [RelType.RacingGameHasImage, ControllerNodeType.IMAGE],
            [RelType.RacingGameHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    relationships.set(
        ControllerNodeType.GAMING_PLATFORM, new Map([
            [RelType.GamingPlatformFeaturesRacingGame, ControllerNodeType.RACING_GAME],
            [RelType.GamingPlatformHasImage, ControllerNodeType.IMAGE],
            [RelType.GamingPlatformHasPrimeImage, ControllerNodeType.IMAGE],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName as RelType)

    if (!match) {
        throw new Error(`TEST ERROR: No mapping found for relationship ${relationshipName}`)
    }

    return match
}
