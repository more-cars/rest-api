import assert from "assert"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {CompanySchema} from "../CompanySchema"
import {BrandSchema} from "../BrandSchema"
import {CarModelSchema} from "../CarModelSchema"
import {CarModelVariantSchema} from "../CarModelVariantSchema"
import {RaceTrackSchema} from "../RaceTrackSchema"
import {TrackLayoutSchema} from "../TrackLayoutSchema"
import {RacingSeriesSchema} from "../RacingSeriesSchema"
import {RacingEventSchema} from "../RacingEventSchema"
import {RacingSessionSchema} from "../RacingSessionSchema"
import {SessionResultSchema} from "../SessionResultSchema"
import {LapTimeSchema} from "../LapTimeSchema"
import {RacingGameSchema} from "../RacingGameSchema"
import {GamingPlatformSchema} from "../GamingPlatformSchema"
import {ImageSchema} from "../ImageSchema"

export function getSchemaForNodeType(nodeType: ControllerNodeType) {
    switch (nodeType) {
        case ControllerNodeType.COMPANY:
            return CompanySchema
        case ControllerNodeType.BRAND:
            return BrandSchema
        case ControllerNodeType.CAR_MODEL:
            return CarModelSchema
        case ControllerNodeType.CAR_MODEL_VARIANT:
            return CarModelVariantSchema
        case ControllerNodeType.RACE_TRACK:
            return RaceTrackSchema
        case ControllerNodeType.TRACK_LAYOUT:
            return TrackLayoutSchema
        case ControllerNodeType.RACING_SERIES:
            return RacingSeriesSchema
        case ControllerNodeType.RACING_EVENT:
            return RacingEventSchema
        case ControllerNodeType.RACING_SESSION:
            return RacingSessionSchema
        case ControllerNodeType.SESSION_RESULT:
            return SessionResultSchema
        case ControllerNodeType.LAP_TIME:
            return LapTimeSchema
        case ControllerNodeType.RACING_GAME:
            return RacingGameSchema
        case ControllerNodeType.GAMING_PLATFORM:
            return GamingPlatformSchema
        case ControllerNodeType.IMAGE:
            return ImageSchema
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
