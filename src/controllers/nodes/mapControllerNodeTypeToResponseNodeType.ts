import {ControllerNodeType} from "./types/ControllerNodeType"
import {ResponseNodeType} from "./types/ResponseNodeType"
import {NodeTypeNotFoundError} from "./types/NodeTypeNotFoundError"

export function mapControllerNodeTypeToResponseNodeType(controllerNodeType: ControllerNodeType): ResponseNodeType {
    const mapping = new Map<ControllerNodeType, ResponseNodeType>([
        [ControllerNodeType.Company, ResponseNodeType.COMPANY],
        [ControllerNodeType.Brand, ResponseNodeType.BRAND],
        [ControllerNodeType.CarModel, ResponseNodeType.CAR_MODEL],
        [ControllerNodeType.CarModelVariant, ResponseNodeType.CAR_MODEL_VARIANT],
        [ControllerNodeType.RaceTrack, ResponseNodeType.RACE_TRACK],
        [ControllerNodeType.TrackLayout, ResponseNodeType.TRACK_LAYOUT],
        [ControllerNodeType.RacingSeries, ResponseNodeType.RACING_SERIES],
        [ControllerNodeType.RacingEvent, ResponseNodeType.RACING_EVENT],
        [ControllerNodeType.RacingSession, ResponseNodeType.RACING_SESSION],
        [ControllerNodeType.SessionResult, ResponseNodeType.SESSION_RESULT],
        [ControllerNodeType.LapTime, ResponseNodeType.LAP_TIME],
        [ControllerNodeType.RacingGame, ResponseNodeType.RACING_GAME],
        [ControllerNodeType.GamingPlatform, ResponseNodeType.GAMING_PLATFORM],
        [ControllerNodeType.Image, ResponseNodeType.IMAGE],
    ])

    const mappedNodeType = mapping.get(controllerNodeType)

    if (!mappedNodeType) {
        throw new NodeTypeNotFoundError(controllerNodeType)
    }

    return mappedNodeType
}
