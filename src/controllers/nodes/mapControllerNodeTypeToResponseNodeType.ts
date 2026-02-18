import {NodeTypeEnum} from "./types/NodeTypeEnum"
import {ResponseNodeType} from "./types/ResponseNodeType"
import {NodeTypeNotFoundError} from "./types/NodeTypeNotFoundError"

export function mapControllerNodeTypeToResponseNodeType(controllerNodeType: NodeTypeEnum): ResponseNodeType {
    const mapping = new Map<NodeTypeEnum, ResponseNodeType>([
        [NodeTypeEnum.COMPANY, ResponseNodeType.COMPANY],
        [NodeTypeEnum.BRAND, ResponseNodeType.BRAND],
        [NodeTypeEnum.CAR_MODEL, ResponseNodeType.CAR_MODEL],
        [NodeTypeEnum.CAR_MODEL_VARIANT, ResponseNodeType.CAR_MODEL_VARIANT],
        [NodeTypeEnum.RACE_TRACK, ResponseNodeType.RACE_TRACK],
        [NodeTypeEnum.TRACK_LAYOUT, ResponseNodeType.TRACK_LAYOUT],
        [NodeTypeEnum.RACING_SERIES, ResponseNodeType.RACING_SERIES],
        [NodeTypeEnum.RACING_EVENT, ResponseNodeType.RACING_EVENT],
        [NodeTypeEnum.RACING_SESSION, ResponseNodeType.RACING_SESSION],
        [NodeTypeEnum.SESSION_RESULT, ResponseNodeType.SESSION_RESULT],
        [NodeTypeEnum.LAP_TIME, ResponseNodeType.LAP_TIME],
        [NodeTypeEnum.RACING_GAME, ResponseNodeType.RACING_GAME],
        [NodeTypeEnum.GAMING_PLATFORM, ResponseNodeType.GAMING_PLATFORM],
        [NodeTypeEnum.IMAGE, ResponseNodeType.IMAGE],
    ])

    const mappedNodeType = mapping.get(controllerNodeType)

    if (!mappedNodeType) {
        throw new NodeTypeNotFoundError(controllerNodeType)
    }

    return mappedNodeType
}
