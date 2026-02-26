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
import {FakeMagazine} from "./FakeMagazine"
import {FakeImage} from "./FakeImage"

export function FakeNodeType(nodeType: DbNodeType) {
    switch (nodeType) {
        case DbNodeType.Company:
            return FakeCompany
        case DbNodeType.Brand:
            return FakeBrand
        case DbNodeType.CarModel:
            return FakeCarModel
        case DbNodeType.CarModelVariant:
            return FakeCarModelVariant
        case DbNodeType.RaceTrack:
            return FakeRaceTrack
        case DbNodeType.TrackLayout:
            return FakeTrackLayout
        case DbNodeType.RacingSeries:
            return FakeRacingSeries
        case DbNodeType.RacingEvent:
            return FakeRacingEvent
        case DbNodeType.RacingSession:
            return FakeRacingSession
        case DbNodeType.SessionResult:
            return FakeSessionResult
        case DbNodeType.LapTime:
            return FakeLapTime
        case DbNodeType.RacingGame:
            return FakeRacingGame
        case DbNodeType.GamingPlatform:
            return FakeGamingPlatform
        case DbNodeType.Magazine:
            return FakeMagazine
        case DbNodeType.Image:
            return FakeImage
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
