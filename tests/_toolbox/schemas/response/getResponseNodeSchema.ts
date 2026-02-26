import assert from "assert"
import {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"
import {CompanySchema} from "./CompanySchema"
import {BrandSchema} from "./BrandSchema"
import {CarModelSchema} from "./CarModelSchema"
import {CarModelVariantSchema} from "./CarModelVariantSchema"
import {RaceTrackSchema} from "./RaceTrackSchema"
import {TrackLayoutSchema} from "./TrackLayoutSchema"
import {RacingSeriesSchema} from "./RacingSeriesSchema"
import {RacingEventSchema} from "./RacingEventSchema"
import {RacingSessionSchema} from "./RacingSessionSchema"
import {SessionResultSchema} from "./SessionResultSchema"
import {LapTimeSchema} from "./LapTimeSchema"
import {RacingGameSchema} from "./RacingGameSchema"
import {GamingPlatformSchema} from "./GamingPlatformSchema"
import {MagazineSchema} from "./MagazineSchema"
import {ImageSchema} from "./ImageSchema"

export function getResponseNodeSchema(nodeType: ControllerNodeType) {
    switch (nodeType) {
        case ControllerNodeType.Company:
            return CompanySchema
        case ControllerNodeType.Brand:
            return BrandSchema
        case ControllerNodeType.CarModel:
            return CarModelSchema
        case ControllerNodeType.CarModelVariant:
            return CarModelVariantSchema
        case ControllerNodeType.RaceTrack:
            return RaceTrackSchema
        case ControllerNodeType.TrackLayout:
            return TrackLayoutSchema
        case ControllerNodeType.RacingSeries:
            return RacingSeriesSchema
        case ControllerNodeType.RacingEvent:
            return RacingEventSchema
        case ControllerNodeType.RacingSession:
            return RacingSessionSchema
        case ControllerNodeType.SessionResult:
            return SessionResultSchema
        case ControllerNodeType.LapTime:
            return LapTimeSchema
        case ControllerNodeType.RacingGame:
            return RacingGameSchema
        case ControllerNodeType.GamingPlatform:
            return GamingPlatformSchema
        case ControllerNodeType.Magazine:
            return MagazineSchema
        case ControllerNodeType.Image:
            return ImageSchema
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
