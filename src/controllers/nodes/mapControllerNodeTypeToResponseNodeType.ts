import {ControllerNodeType} from "./types/ControllerNodeType"
import {ResponseNodeType} from "./types/ResponseNodeType"
import {NodeTypeNotFoundError} from "./types/NodeTypeNotFoundError"

export function mapControllerNodeTypeToResponseNodeType(controllerNodeType: ControllerNodeType): ResponseNodeType {
    const mapping = new Map<ControllerNodeType, ResponseNodeType>([
        [ControllerNodeType.COMPANY, ResponseNodeType.COMPANY],
        [ControllerNodeType.BRAND, ResponseNodeType.BRAND],
        [ControllerNodeType.CAR_MODEL, ResponseNodeType.CAR_MODEL],
        [ControllerNodeType.CAR_MODEL_VARIANT, ResponseNodeType.CAR_MODEL_VARIANT],
        [ControllerNodeType.RACE_TRACK, ResponseNodeType.RACE_TRACK],
        [ControllerNodeType.TRACK_LAYOUT, ResponseNodeType.TRACK_LAYOUT],
        [ControllerNodeType.RACING_SERIES, ResponseNodeType.RACING_SERIES],
        [ControllerNodeType.RACING_EVENT, ResponseNodeType.RACING_EVENT],
        [ControllerNodeType.RACING_SESSION, ResponseNodeType.RACING_SESSION],
        [ControllerNodeType.SESSION_RESULT, ResponseNodeType.SESSION_RESULT],
        [ControllerNodeType.LAP_TIME, ResponseNodeType.LAP_TIME],
        [ControllerNodeType.RACING_GAME, ResponseNodeType.RACING_GAME],
        [ControllerNodeType.GAMING_PLATFORM, ResponseNodeType.GAMING_PLATFORM],
        [ControllerNodeType.IMAGE, ResponseNodeType.IMAGE],
    ])

    const mappedNodeType = mapping.get(controllerNodeType)

    if (!mappedNodeType) {
        throw new NodeTypeNotFoundError(controllerNodeType)
    }

    return mappedNodeType
}
