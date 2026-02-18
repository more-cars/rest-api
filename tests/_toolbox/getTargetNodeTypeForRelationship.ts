import {NodeTypeEnum} from "../../src/controllers/nodes/types/NodeTypeEnum"
import {RelType} from "../../src/models/relationships/types/RelType"
import {snakeCase} from "change-case"

export function getTargetNodeTypeForRelationship(startNodeType: NodeTypeEnum, relationshipName: string) {
    const relationships = new Map<NodeTypeEnum, Map<RelType, NodeTypeEnum>>()
    relationshipName = snakeCase(startNodeType + ' ' + relationshipName)

    relationships.set(
        NodeTypeEnum.IMAGE, new Map([
            [RelType.ImageBelongsToNode, NodeTypeEnum.COMPANY],
            [RelType.ImageBelongsToNode, NodeTypeEnum.BRAND],
            [RelType.ImageBelongsToNode, NodeTypeEnum.CAR_MODEL],
            [RelType.ImageBelongsToNode, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.ImageBelongsToNode, NodeTypeEnum.RACE_TRACK],
            [RelType.ImageBelongsToNode, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.ImageBelongsToNode, NodeTypeEnum.RACING_SERIES],
            [RelType.ImageBelongsToNode, NodeTypeEnum.RACING_EVENT],
            [RelType.ImageBelongsToNode, NodeTypeEnum.RACING_SESSION],
            [RelType.ImageBelongsToNode, NodeTypeEnum.SESSION_RESULT],
            [RelType.ImageBelongsToNode, NodeTypeEnum.LAP_TIME],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.COMPANY],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.BRAND],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.CAR_MODEL],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.RACE_TRACK],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.RACING_SERIES],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.RACING_EVENT],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.RACING_SESSION],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.SESSION_RESULT],
            [RelType.ImageIsPrimeImageOfNode, NodeTypeEnum.LAP_TIME],
        ]))

    relationships.set(
        NodeTypeEnum.COMPANY, new Map([
            [RelType.CompanyHasBrand, NodeTypeEnum.BRAND],
            [RelType.CompanyHasImage, NodeTypeEnum.IMAGE],
            [RelType.CompanyHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.BRAND, new Map([
            [RelType.BrandBelongsToCompany, NodeTypeEnum.COMPANY],
            [RelType.BrandHasCarModel, NodeTypeEnum.CAR_MODEL],
            [RelType.BrandHasImage, NodeTypeEnum.IMAGE],
            [RelType.BrandHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.CAR_MODEL, new Map([
            [RelType.CarModelBelongsToBrand, NodeTypeEnum.BRAND],
            [RelType.CarModelHasSuccessor, NodeTypeEnum.CAR_MODEL],
            [RelType.CarModelIsSuccessorOf, NodeTypeEnum.CAR_MODEL],
            [RelType.CarModelHasVariant, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.CarModelHasImage, NodeTypeEnum.IMAGE],
            [RelType.CarModelHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.CAR_MODEL_VARIANT, new Map([
            [RelType.CarModelVariantIsVariantOf, NodeTypeEnum.CAR_MODEL],
            [RelType.CarModelVariantAchievedSessionResult, NodeTypeEnum.SESSION_RESULT],
            [RelType.CarModelVariantAchievedLapTime, NodeTypeEnum.LAP_TIME],
            [RelType.CarModelVariantIsFeaturedInRacingGame, NodeTypeEnum.RACING_GAME],
            [RelType.CarModelVariantHasImage, NodeTypeEnum.IMAGE],
            [RelType.CarModelVariantHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACE_TRACK, new Map([
            [RelType.RaceTrackHasLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.RaceTrackHostedRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.RaceTrackHasImage, NodeTypeEnum.IMAGE],
            [RelType.RaceTrackHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.TRACK_LAYOUT, new Map([
            [RelType.TrackLayoutBelongsToRaceTrack, NodeTypeEnum.RACE_TRACK],
            [RelType.TrackLayoutWasUsedByRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.TrackLayoutHasLapTime, NodeTypeEnum.LAP_TIME],
            [RelType.TrackLayoutIsFeaturedInRacingGame, NodeTypeEnum.RACING_GAME],
            [RelType.TrackLayoutHasImage, NodeTypeEnum.IMAGE],
            [RelType.TrackLayoutHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_SERIES, new Map([
            [RelType.RacingSeriesHasRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.RacingSeriesHasImage, NodeTypeEnum.IMAGE],
            [RelType.RacingSeriesHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_EVENT, new Map([
            [RelType.RacingEventBelongsToRacingSeries, NodeTypeEnum.RACING_SERIES],
            [RelType.RacingEventFollowsEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.RacingEventIsFollowedByEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.RacingEventTookPlaceAtRaceTrack, NodeTypeEnum.RACE_TRACK],
            [RelType.RacingEventUsedTheTrackLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.RacingEventHasRacingSession, NodeTypeEnum.RACING_SESSION],
            [RelType.RacingEventHasImage, NodeTypeEnum.IMAGE],
            [RelType.RacingEventHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_SESSION, new Map([
            [RelType.RacingSessionBelongsToRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelType.RacingSessionHasSessionResult, NodeTypeEnum.SESSION_RESULT],
            [RelType.RacingSessionHasImage, NodeTypeEnum.IMAGE],
            [RelType.RacingSessionHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.SESSION_RESULT, new Map([
            [RelType.SessionResultBelongsToRacingSession, NodeTypeEnum.RACING_SESSION],
            [RelType.SessionResultHasLapTime, NodeTypeEnum.LAP_TIME],
            [RelType.SessionResultAchievedWithCarModelVariant, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.SessionResultHasImage, NodeTypeEnum.IMAGE],
            [RelType.SessionResultHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.LAP_TIME, new Map([
            [RelType.LapTimeBelongsToSessionResult, NodeTypeEnum.SESSION_RESULT],
            [RelType.LapTimeAchievedOnTrackLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.LapTimeAchievedWithCarModelVariant, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.LapTimeHasImage, NodeTypeEnum.IMAGE],
            [RelType.LapTimeHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_GAME, new Map([
            [RelType.RacingGameFeaturesCarModelVariant, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelType.RacingGameFeaturesTrackLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelType.RacingGameReleasedOnGamingPlatform, NodeTypeEnum.GAMING_PLATFORM],
            [RelType.RacingGameHasImage, NodeTypeEnum.IMAGE],
            [RelType.RacingGameHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.GAMING_PLATFORM, new Map([
            [RelType.GamingPlatformFeaturesRacingGame, NodeTypeEnum.RACING_GAME],
            [RelType.GamingPlatformHasImage, NodeTypeEnum.IMAGE],
            [RelType.GamingPlatformHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName as RelType)

    if (!match) {
        throw new Error(`TEST ERROR: No mapping found for relationship ${relationshipName}`)
    }

    return match
}
