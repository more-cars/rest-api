import assert from "assert"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {FakeCompany} from "./FakeCompany"
import {FakeBrand} from "./FakeBrand"
import {FakeCarModel} from "./FakeCarModel"
import {FakeRaceTrack} from "./FakeRaceTrack"
import {FakeTrackLayout} from "./FakeTrackLayout"
import {FakeRacingSeries} from "./FakeRacingSeries"
import {FakeRacingEvent} from "./FakeRacingEvent"
import {FakeRacingSession} from "./FakeRacingSession"
import {FakeSessionResult} from "./FakeSessionResult"
import {FakeLapTime} from "./FakeLapTime"
import {FakeImage} from "./FakeImage"

export function FakeNodeInput(nodeType: NodeTypeEnum) {
    switch (nodeType) {
        case NodeTypeEnum.COMPANY:
            return FakeCompany.dbInput()
        case NodeTypeEnum.BRAND:
            return FakeBrand.dbInput()
        case NodeTypeEnum.CAR_MODEL:
            return FakeCarModel.dbInput()
        case NodeTypeEnum.RACE_TRACK:
            return FakeRaceTrack.dbInput()
        case NodeTypeEnum.TRACK_LAYOUT:
            return FakeTrackLayout.dbInput()
        case NodeTypeEnum.RACING_SERIES:
            return FakeRacingSeries.dbInput()
        case NodeTypeEnum.RACING_EVENT:
            return FakeRacingEvent.dbInput()
        case NodeTypeEnum.RACING_SESSION:
            return FakeRacingSession.dbInput()
        case NodeTypeEnum.SESSION_RESULT:
            return FakeSessionResult.dbInput()
        case NodeTypeEnum.LAP_TIME:
            return FakeLapTime.dbInput()
        case NodeTypeEnum.IMAGE:
            return FakeImage.dbInput()
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
