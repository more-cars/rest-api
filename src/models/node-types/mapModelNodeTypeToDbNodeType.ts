import {ModelNodeType} from "../types/ModelNodeType"
import {DbNodeType} from "../../db/types/DbNodeType"

export function mapModelNodeTypeToDbNodeType(modelNodeType: ModelNodeType) {
    const mapping = new Map<ModelNodeType, DbNodeType>([
        [ModelNodeType.Node, DbNodeType.Node],
        [ModelNodeType.Company, DbNodeType.Company],
        [ModelNodeType.Brand, DbNodeType.Brand],
        [ModelNodeType.CarModel, DbNodeType.CarModel],
        [ModelNodeType.CarModelVariant, DbNodeType.CarModelVariant],
        [ModelNodeType.RaceTrack, DbNodeType.RaceTrack],
        [ModelNodeType.TrackLayout, DbNodeType.TrackLayout],
        [ModelNodeType.RacingSeries, DbNodeType.RacingSeries],
        [ModelNodeType.RacingEvent, DbNodeType.RacingEvent],
        [ModelNodeType.RacingSession, DbNodeType.RacingSession],
        [ModelNodeType.SessionResult, DbNodeType.SessionResult],
        [ModelNodeType.LapTime, DbNodeType.LapTime],
        [ModelNodeType.RacingGame, DbNodeType.RacingGame],
        [ModelNodeType.GamingPlatform, DbNodeType.GamingPlatform],
        [ModelNodeType.Magazine, DbNodeType.Magazine],
        [ModelNodeType.MagazineIssue, DbNodeType.MagazineIssue],
        [ModelNodeType.Rating, DbNodeType.Rating],
        [ModelNodeType.Programme, DbNodeType.Programme],
        [ModelNodeType.Image, DbNodeType.Image],
    ])

    const dbNodeType = mapping.get(modelNodeType)

    if (dbNodeType === null || dbNodeType === undefined) {
        throw new Error(`No mapping found for node type ${modelNodeType}`)
    }

    return dbNodeType
}
