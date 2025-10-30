import {NodeTypeEnum} from "../../src/controllers/nodes/types/NodeTypeEnum"
import {RelationshipType} from "../../src/models/relationships/types/RelationshipType"
import {constantCase} from "change-case"

export function getTargetNodeTypeForRelationship(startNodeType: NodeTypeEnum, relationshipName: string) {
    const relationships = new Map<NodeTypeEnum, Map<RelationshipType, NodeTypeEnum>>()
    relationshipName = constantCase(relationshipName)

    relationships.set(
        NodeTypeEnum.IMAGE, new Map([
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.COMPANY],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.BRAND],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.CAR_MODEL],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.RACE_TRACK],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.TRACK_LAYOUT],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.RACING_SERIES],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.RACING_SESSION],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.SESSION_RESULT],
            [RelationshipType.ImageBelongsToNode, NodeTypeEnum.LAP_TIME],
        ]))

    relationships.set(
        NodeTypeEnum.COMPANY, new Map([
            [RelationshipType.CompanyHasBrand, NodeTypeEnum.BRAND],
            [RelationshipType.CompanyHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.CompanyHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.BRAND, new Map([
            [RelationshipType.BrandBelongsToCompany, NodeTypeEnum.COMPANY],
            [RelationshipType.BrandHasCarModel, NodeTypeEnum.CAR_MODEL],
            [RelationshipType.BrandHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.BrandHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.CAR_MODEL, new Map([
            [RelationshipType.CarModelBelongsToBrand, NodeTypeEnum.BRAND],
            [RelationshipType.CarModelHasSuccessor, NodeTypeEnum.CAR_MODEL],
            [RelationshipType.CarModelIsSuccessorOf, NodeTypeEnum.CAR_MODEL],
            [RelationshipType.CarModelHasVariant, NodeTypeEnum.CAR_MODEL_VARIANT],
            [RelationshipType.CarModelHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.CarModelHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.CAR_MODEL_VARIANT, new Map([
            [RelationshipType.CarModelVariantIsVariantOf, NodeTypeEnum.CAR_MODEL],
        ]))

    relationships.set(
        NodeTypeEnum.RACE_TRACK, new Map([
            [RelationshipType.RaceTrackHasLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelationshipType.RaceTrackHostedRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.RaceTrackHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.RaceTrackHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.TRACK_LAYOUT, new Map([
            [RelationshipType.TrackLayoutBelongsToRaceTrack, NodeTypeEnum.RACE_TRACK],
            [RelationshipType.TrackLayoutWasUsedByRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.TrackLayoutHasLapTime, NodeTypeEnum.LAP_TIME],
            [RelationshipType.TrackLayoutHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.TrackLayoutHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_SERIES, new Map([
            [RelationshipType.RacingSeriesHasRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.RacingSeriesHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.RacingSeriesHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_EVENT, new Map([
            [RelationshipType.RacingEventBelongsToRacingSeries, NodeTypeEnum.RACING_SERIES],
            [RelationshipType.RacingEventFollowsEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.RacingEventIsFollowedByEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.RacingEventTookPlaceAtRaceTrack, NodeTypeEnum.RACE_TRACK],
            [RelationshipType.RacingEventUsedTheTrackLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelationshipType.RacingEventHasRacingSession, NodeTypeEnum.RACING_SESSION],
            [RelationshipType.RacingEventHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.RacingEventHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.RACING_SESSION, new Map([
            [RelationshipType.RacingSessionBelongsToRacingEvent, NodeTypeEnum.RACING_EVENT],
            [RelationshipType.RacingSessionHasSessionResult, NodeTypeEnum.SESSION_RESULT],
            [RelationshipType.RacingSessionHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.RacingSessionHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.SESSION_RESULT, new Map([
            [RelationshipType.SessionResultBelongsToRacingSession, NodeTypeEnum.RACING_SESSION],
            [RelationshipType.SessionResultHasLapTime, NodeTypeEnum.LAP_TIME],
            [RelationshipType.SessionResultHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.SessionResultHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    relationships.set(
        NodeTypeEnum.LAP_TIME, new Map([
            [RelationshipType.LapTimeBelongsToSessionResult, NodeTypeEnum.SESSION_RESULT],
            [RelationshipType.LapTimeAchievedOnTrackLayout, NodeTypeEnum.TRACK_LAYOUT],
            [RelationshipType.LapTimeHasImage, NodeTypeEnum.IMAGE],
            [RelationshipType.LapTimeHasPrimeImage, NodeTypeEnum.IMAGE],
        ]))

    const match = relationships.get(startNodeType)?.get(relationshipName as RelationshipType)

    if (!match) {
        throw new Error(`TEST ERROR: No mapping found for relationship ${relationshipName}`)
    }

    return match
}
