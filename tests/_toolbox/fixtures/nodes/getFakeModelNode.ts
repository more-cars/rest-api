import assert from "assert"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
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

export function getFakeModelNode(nodeType: ModelNodeType) {
    switch (nodeType) {
        case ModelNodeType.Company:
            return FakeCompany.modelOutput()
        case ModelNodeType.Brand:
            return FakeBrand.modelOutput()
        case ModelNodeType.CarModel:
            return FakeCarModel.modelOutput()
        case ModelNodeType.CarModelVariant:
            return FakeCarModelVariant.modelOutput()
        case ModelNodeType.RaceTrack:
            return FakeRaceTrack.modelOutput()
        case ModelNodeType.TrackLayout:
            return FakeTrackLayout.modelOutput()
        case ModelNodeType.RacingSeries:
            return FakeRacingSeries.modelOutput()
        case ModelNodeType.RacingEvent:
            return FakeRacingEvent.modelOutput()
        case ModelNodeType.RacingSession:
            return FakeRacingSession.modelOutput()
        case ModelNodeType.SessionResult:
            return FakeSessionResult.modelOutput()
        case ModelNodeType.LapTime:
            return FakeLapTime.modelOutput()
        case ModelNodeType.RacingGame:
            return FakeRacingGame.modelOutput()
        case ModelNodeType.GamingPlatform:
            return FakeGamingPlatform.modelOutput()
        case ModelNodeType.Image:
            return FakeImage.modelOutput()
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
