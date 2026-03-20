import assert from "assert"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {CompanySchema} from "./CompanySchema"
import {BrandSchema} from "./BrandSchema"
import {CarModelSchema} from "./CarModelSchema"
import {CarModelVariantSchema} from "./CarModelVariantSchema"
import {PriceSchema} from "./PriceSchema"
import {RaceTrackSchema} from "./RaceTrackSchema"
import {TrackLayoutSchema} from "./TrackLayoutSchema"
import {RacingSeriesSchema} from "./RacingSeriesSchema"
import {RacingEventSchema} from "./RacingEventSchema"
import {RacingSessionSchema} from "./RacingSessionSchema"
import {SessionResultSchema} from "./SessionResultSchema"
import {LapTimeSchema} from "./LapTimeSchema"
import {RacingGameSchema} from "./RacingGameSchema"
import {GamingPlatformSchema} from "./GamingPlatformSchema"
import {ModelCarSchema} from "./ModelCarSchema"
import {ModelCarBrandSchema} from "./ModelCarBrandSchema"
import {MagazineSchema} from "./MagazineSchema"
import {MagazineIssueSchema} from "./MagazineIssueSchema"
import {RatingSchema} from "./RatingSchema"
import {ProgrammeSchema} from "./ProgrammeSchema"
import {ProgrammeEpisodeSchema} from "./ProgrammeEpisodeSchema"
import {MotorShowSchema} from "./MotorShowSchema"
import {ImageSchema} from "./ImageSchema"

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
        [ControllerNodeType.Image, ImageSchema],
    ])

    const responseNodeSchema = mapping.get(nodeType)

    if (!responseNodeSchema) {
        assert.fail(`No schema found for node type "${nodeType}"`)
    }

    return responseNodeSchema
}
