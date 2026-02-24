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

export function getExhaustiveFakeInputDataForDbNode(nodeType: ControllerNodeType) {
    switch (nodeType) {
        case ControllerNodeType.Company:
            return FakeCompany.dbInput()
        case ControllerNodeType.Brand:
            return FakeBrand.dbInput()
        case ControllerNodeType.CarModel:
            return FakeCarModel.dbInput()
        case ControllerNodeType.CarModelVariant:
            return FakeCarModelVariant.dbInput()
        case ControllerNodeType.RaceTrack:
            return FakeRaceTrack.dbInput()
        case ControllerNodeType.TrackLayout:
            return FakeTrackLayout.dbInput()
        case ControllerNodeType.RacingSeries:
            return FakeRacingSeries.dbInput()
        case ControllerNodeType.RacingEvent:
            return FakeRacingEvent.dbInput()
        case ControllerNodeType.RacingSession:
            return FakeRacingSession.dbInput()
        case ControllerNodeType.SessionResult:
            return FakeSessionResult.dbInput()
        case ControllerNodeType.LapTime:
            return FakeLapTime.dbInput()
        case ControllerNodeType.RacingGame:
            return FakeRacingGame.dbInput()
        case ControllerNodeType.GamingPlatform:
            return FakeGamingPlatform.dbInput()
        case ControllerNodeType.Image:
            return FakeImage.dbInput()
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
