import assert from "assert"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {CompanySchema} from "./node-types/CompanySchema"
import {BrandSchema} from "./node-types/BrandSchema"
import {CarModelSchema} from "./node-types/CarModelSchema"
import {CarModelVariantSchema} from "./node-types/CarModelVariantSchema"
import {PriceSchema} from "./node-types/PriceSchema"
import {RaceTrackSchema} from "./node-types/RaceTrackSchema"
import {TrackLayoutSchema} from "./node-types/TrackLayoutSchema"
import {RacingSeriesSchema} from "./node-types/RacingSeriesSchema"
import {RacingEventSchema} from "./node-types/RacingEventSchema"
import {RacingSessionSchema} from "./node-types/RacingSessionSchema"
import {SessionResultSchema} from "./node-types/SessionResultSchema"
import {LapTimeSchema} from "./node-types/LapTimeSchema"
import {RacingGameSchema} from "./node-types/RacingGameSchema"
import {GamingPlatformSchema} from "./node-types/GamingPlatformSchema"
import {ModelCarSchema} from "./node-types/ModelCarSchema"
import {ModelCarBrandSchema} from "./node-types/ModelCarBrandSchema"
import {MagazineSchema} from "./node-types/MagazineSchema"
import {MagazineIssueSchema} from "./node-types/MagazineIssueSchema"
import {RatingSchema} from "./node-types/RatingSchema"
import {ProgrammeSchema} from "./node-types/ProgrammeSchema"
import {ProgrammeEpisodeSchema} from "./node-types/ProgrammeEpisodeSchema"
import {MotorShowSchema} from "./node-types/MotorShowSchema"
import {VideoSchema} from "./VideoSchema"
import {ImageSchema} from "./node-types/ImageSchema"

export function getResponseNodeSchema(nodeType: ControllerNodeType) {
    const mapping = new Map<ControllerNodeType, object>([
        [ControllerNodeType.Company, CompanySchema],
        [ControllerNodeType.Brand, BrandSchema],
        [ControllerNodeType.CarModel, CarModelSchema],
        [ControllerNodeType.CarModelVariant, CarModelVariantSchema],
        [ControllerNodeType.Price, PriceSchema],
        [ControllerNodeType.RaceTrack, RaceTrackSchema],
        [ControllerNodeType.TrackLayout, TrackLayoutSchema],
        [ControllerNodeType.RacingSeries, RacingSeriesSchema],
        [ControllerNodeType.RacingEvent, RacingEventSchema],
        [ControllerNodeType.RacingSession, RacingSessionSchema],
        [ControllerNodeType.SessionResult, SessionResultSchema],
        [ControllerNodeType.LapTime, LapTimeSchema],
        [ControllerNodeType.RacingGame, RacingGameSchema],
        [ControllerNodeType.GamingPlatform, GamingPlatformSchema],
        [ControllerNodeType.ModelCar, ModelCarSchema],
        [ControllerNodeType.ModelCarBrand, ModelCarBrandSchema],
        [ControllerNodeType.Magazine, MagazineSchema],
        [ControllerNodeType.MagazineIssue, MagazineIssueSchema],
        [ControllerNodeType.Rating, RatingSchema],
        [ControllerNodeType.Programme, ProgrammeSchema],
        [ControllerNodeType.ProgrammeEpisode, ProgrammeEpisodeSchema],
        [ControllerNodeType.MotorShow, MotorShowSchema],
        [ControllerNodeType.Video, VideoSchema],
        [ControllerNodeType.Image, ImageSchema],
    ])

    const responseNodeSchema = mapping.get(nodeType)

    if (!responseNodeSchema) {
        assert.fail(`No schema found for node type "${nodeType}"`)
    }

    return responseNodeSchema
}
