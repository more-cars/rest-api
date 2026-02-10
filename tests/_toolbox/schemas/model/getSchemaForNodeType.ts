import assert from "assert"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
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
import {ImageSchema} from "../ImageSchema"

export function getSchemaForNodeType(nodeType: NodeTypeEnum) {
    switch (nodeType) {
        case NodeTypeEnum.COMPANY:
            return CompanySchema
        case NodeTypeEnum.BRAND:
            return BrandSchema
        case NodeTypeEnum.CAR_MODEL:
            return CarModelSchema
        case NodeTypeEnum.CAR_MODEL_VARIANT:
            return CarModelVariantSchema
        case NodeTypeEnum.RACE_TRACK:
            return RaceTrackSchema
        case NodeTypeEnum.TRACK_LAYOUT:
            return TrackLayoutSchema
        case NodeTypeEnum.RACING_SERIES:
            return RacingSeriesSchema
        case NodeTypeEnum.RACING_EVENT:
            return RacingEventSchema
        case NodeTypeEnum.RACING_SESSION:
            return RacingSessionSchema
        case NodeTypeEnum.SESSION_RESULT:
            return SessionResultSchema
        case NodeTypeEnum.LAP_TIME:
            return LapTimeSchema
        case NodeTypeEnum.RACING_GAME:
            return RacingGameSchema
        case NodeTypeEnum.IMAGE:
            return ImageSchema
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
