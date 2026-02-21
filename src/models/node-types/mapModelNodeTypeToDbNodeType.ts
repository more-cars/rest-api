import {ModelNodeType} from "../types/ModelNodeType"
import {DbNodeType} from "../../db/types/DbNodeType"

export function mapModelNodeTypeToDbNodeType(modelNodeType: ModelNodeType) {
    const mapping = new Map<ModelNodeType, DbNodeType>([
        [ModelNodeType.Node, DbNodeType.Node],
        [ModelNodeType.Image, DbNodeType.Image],
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
    ])

    const dbNodeType = mapping.get(modelNodeType)

    if (dbNodeType === null || dbNodeType === undefined) {
        throw new Error(`No mapping found for node type ${modelNodeType}`)
    }

    return dbNodeType
}
