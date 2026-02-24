import assert from "assert"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
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

export function getExhaustiveFakeInputDataForDbNode(nodeType: DbNodeType) {
    switch (nodeType) {
        case DbNodeType.Company:
            return FakeCompany.dbInput()
        case DbNodeType.Brand:
            return FakeBrand.dbInput()
        case DbNodeType.CarModel:
            return FakeCarModel.dbInput()
        case DbNodeType.CarModelVariant:
            return FakeCarModelVariant.dbInput()
        case DbNodeType.RaceTrack:
            return FakeRaceTrack.dbInput()
        case DbNodeType.TrackLayout:
            return FakeTrackLayout.dbInput()
        case DbNodeType.RacingSeries:
            return FakeRacingSeries.dbInput()
        case DbNodeType.RacingEvent:
            return FakeRacingEvent.dbInput()
        case DbNodeType.RacingSession:
            return FakeRacingSession.dbInput()
        case DbNodeType.SessionResult:
            return FakeSessionResult.dbInput()
        case DbNodeType.LapTime:
            return FakeLapTime.dbInput()
        case DbNodeType.RacingGame:
            return FakeRacingGame.dbInput()
        case DbNodeType.GamingPlatform:
            return FakeGamingPlatform.dbInput()
        case DbNodeType.Image:
            return FakeImage.dbInput()
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
