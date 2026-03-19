import {NodeType} from "./NodeType"
import {DbNodeType} from "../db/types/DbNodeType"
import {NodeTypeMappingNotFoundError} from "./NodeTypeMappingNotFoundError"

export function mapNodeTypeToDbNodeType(nodeType: NodeType): DbNodeType {
    const mapping = new Map<NodeType, DbNodeType>([
        [NodeType.Node, DbNodeType.Node],
        [NodeType.Company, DbNodeType.Company],
        [NodeType.Brand, DbNodeType.Brand],
        [NodeType.CarModel, DbNodeType.CarModel],
        [NodeType.CarModelVariant, DbNodeType.CarModelVariant],
        [NodeType.RaceTrack, DbNodeType.RaceTrack],
        [NodeType.TrackLayout, DbNodeType.TrackLayout],
        [NodeType.RacingSeries, DbNodeType.RacingSeries],
        [NodeType.RacingEvent, DbNodeType.RacingEvent],
        [NodeType.RacingSession, DbNodeType.RacingSession],
        [NodeType.SessionResult, DbNodeType.SessionResult],
        [NodeType.LapTime, DbNodeType.LapTime],
        [NodeType.RacingGame, DbNodeType.RacingGame],
        [NodeType.GamingPlatform, DbNodeType.GamingPlatform],
        [NodeType.ModelCar, DbNodeType.ModelCar],
        [NodeType.ModelCarBrand, DbNodeType.ModelCarBrand],
        [NodeType.Magazine, DbNodeType.Magazine],
        [NodeType.MagazineIssue, DbNodeType.MagazineIssue],
        [NodeType.Rating, DbNodeType.Rating],
        [NodeType.Programme, DbNodeType.Programme],
        [NodeType.ProgrammeEpisode, DbNodeType.ProgrammeEpisode],
        [NodeType.MotorShow, DbNodeType.MotorShow],
        [NodeType.Image, DbNodeType.Image],
    ])

    const mappedNodeType = mapping.get(nodeType)

    if (mappedNodeType === null || mappedNodeType === undefined) {
        throw new NodeTypeMappingNotFoundError(nodeType)
    }

    return mappedNodeType
}
