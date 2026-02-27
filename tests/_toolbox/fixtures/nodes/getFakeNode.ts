import assert from "assert"
import {NodeType} from "../../../../src/specification/NodeType"
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

export function getFakeNode(nodeType: NodeType) {
    switch (nodeType) {
        case NodeType.Company:
            return FakeCompany
        case NodeType.Brand:
            return FakeBrand
        case NodeType.CarModel:
            return FakeCarModel
        case NodeType.CarModelVariant:
            return FakeCarModelVariant
        case NodeType.RaceTrack:
            return FakeRaceTrack
        case NodeType.TrackLayout:
            return FakeTrackLayout
        case NodeType.RacingSeries:
            return FakeRacingSeries
        case NodeType.RacingEvent:
            return FakeRacingEvent
        case NodeType.RacingSession:
            return FakeRacingSession
        case NodeType.SessionResult:
            return FakeSessionResult
        case NodeType.LapTime:
            return FakeLapTime
        case NodeType.RacingGame:
            return FakeRacingGame
        case NodeType.GamingPlatform:
            return FakeGamingPlatform
        case NodeType.Magazine:
            return FakeMagazine
        case NodeType.Image:
            return FakeImage
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
