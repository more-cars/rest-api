import {ControllerNodeType} from "../types/ControllerNodeType"
import {ModelNodeType} from "../../models/types/ModelNodeType"
import {NodeTypeMappingNotFoundError} from "../../specification/NodeTypeMappingNotFoundError"

export function mapControllerNodeTypeToModelNodeType(controllerNodeType: ControllerNodeType): ModelNodeType {
    const mapping = new Map<ControllerNodeType, ModelNodeType>([
        [ControllerNodeType.Company, ModelNodeType.Company],
        [ControllerNodeType.Brand, ModelNodeType.Brand],
        [ControllerNodeType.CarModel, ModelNodeType.CarModel],
        [ControllerNodeType.CarModelVariant, ModelNodeType.CarModelVariant],
        [ControllerNodeType.RaceTrack, ModelNodeType.RaceTrack],
        [ControllerNodeType.TrackLayout, ModelNodeType.TrackLayout],
        [ControllerNodeType.RacingSeries, ModelNodeType.RacingSeries],
        [ControllerNodeType.RacingEvent, ModelNodeType.RacingEvent],
        [ControllerNodeType.RacingSession, ModelNodeType.RacingSession],
        [ControllerNodeType.SessionResult, ModelNodeType.SessionResult],
        [ControllerNodeType.LapTime, ModelNodeType.LapTime],
        [ControllerNodeType.RacingGame, ModelNodeType.RacingGame],
        [ControllerNodeType.GamingPlatform, ModelNodeType.GamingPlatform],
        [ControllerNodeType.ModelCar, ModelNodeType.ModelCar],
        [ControllerNodeType.ModelCarBrand, ModelNodeType.ModelCarBrand],
        [ControllerNodeType.Magazine, ModelNodeType.Magazine],
        [ControllerNodeType.MagazineIssue, ModelNodeType.MagazineIssue],
        [ControllerNodeType.Rating, ModelNodeType.Rating],
        [ControllerNodeType.Programme, ModelNodeType.Programme],
        [ControllerNodeType.ProgrammeEpisode, ModelNodeType.ProgrammeEpisode],
        [ControllerNodeType.MotorShow, ModelNodeType.MotorShow],
        [ControllerNodeType.Image, ModelNodeType.Image],
    ])

    const mappedNodeType = mapping.get(controllerNodeType)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeMappingNotFoundError(controllerNodeType)
    }

    return mappedNodeType
}
