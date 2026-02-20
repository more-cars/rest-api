import assert from "assert"
import {ControllerNodeType} from "../../../../src/controllers/nodes/types/ControllerNodeType"
import {FakeCompany} from "./FakeCompany"
import {FakeBrand} from "./FakeBrand"
import {FakeCarModel} from "./FakeCarModel"
import {FakeCarModelVariant} from "./FakeCarModelVariant"
import {FakeRaceTrack} from "./FakeRaceTrack"
import {FakeTrackLayout} from "./FakeTrackLayout"
import {FakeRacingSeries} from "./FakeRacingSeries"
import {FakeRacingEvent} from "./FakeRacingEvent"
import {FakeRacingSession} from "./FakeRacingSession"
import {FakeSessionResult} from "./FakeSessionResult"
import {FakeLapTime} from "./FakeLapTime"
import {FakeRacingGame} from "./FakeRacingGame"
import {FakeGamingPlatform} from "./FakeGamingPlatform"
import {FakeImage} from "./FakeImage"

export function FakeNodeInput(nodeType: ControllerNodeType) {
    switch (nodeType) {
        case ControllerNodeType.COMPANY:
            return FakeCompany.dbInput()
        case ControllerNodeType.BRAND:
            return FakeBrand.dbInput()
        case ControllerNodeType.CAR_MODEL:
            return FakeCarModel.dbInput()
        case ControllerNodeType.CAR_MODEL_VARIANT:
            return FakeCarModelVariant.dbInput()
        case ControllerNodeType.RACE_TRACK:
            return FakeRaceTrack.dbInput()
        case ControllerNodeType.TRACK_LAYOUT:
            return FakeTrackLayout.dbInput()
        case ControllerNodeType.RACING_SERIES:
            return FakeRacingSeries.dbInput()
        case ControllerNodeType.RACING_EVENT:
            return FakeRacingEvent.dbInput()
        case ControllerNodeType.RACING_SESSION:
            return FakeRacingSession.dbInput()
        case ControllerNodeType.SESSION_RESULT:
            return FakeSessionResult.dbInput()
        case ControllerNodeType.LAP_TIME:
            return FakeLapTime.dbInput()
        case ControllerNodeType.RACING_GAME:
            return FakeRacingGame.dbInput()
        case ControllerNodeType.GAMING_PLATFORM:
            return FakeGamingPlatform.dbInput()
        case ControllerNodeType.IMAGE:
            return FakeImage.dbInput()
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
