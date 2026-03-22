import assert from "assert"
import {ExpectedNodeType} from "../../types/ExpectedNodeType"
import type {FakeNode} from "./types/FakeNode"
import {FakeCompany} from "./FakeCompany"
import {FakeBrand} from "./FakeBrand"
import {FakeCarModel} from "./FakeCarModel"
import {FakeCarModelVariant} from "./FakeCarModelVariant"
import {FakePrice} from "./FakePrice"
import {FakeRaceTrack} from "./FakeRaceTrack"
import {FakeTrackLayout} from "./FakeTrackLayout"
import {FakeRacingSeries} from "./FakeRacingSeries"
import {FakeRacingEvent} from "./FakeRacingEvent"
import {FakeRacingSession} from "./FakeRacingSession"
import {FakeSessionResult} from "./FakeSessionResult"
import {FakeLapTime} from "./FakeLapTime"
import {FakeRacingGame} from "./FakeRacingGame"
import {FakeGamingPlatform} from "./FakeGamingPlatform"
import {FakeModelCar} from "./FakeModelCar"
import {FakeModelCarBrand} from "./FakeModelCarBrand"
import {FakeMagazine} from "./FakeMagazine"
import {FakeMagazineIssue} from "./FakeMagazineIssue"
import {FakeRating} from "./FakeRating"
import {FakeProgramme} from "./FakeProgramme"
import {FakeProgrammeEpisode} from "./FakeProgrammeEpisode"
import {FakeMotorShow} from "./FakeMotorShow"
import {FakeImage} from "./FakeImage"

export function getFakeNode(nodeType: ExpectedNodeType) {
    const mapping = new Map<ExpectedNodeType, FakeNode>([
        [ExpectedNodeType.Node, FakeBrand],
        [ExpectedNodeType.Company, FakeCompany],
        [ExpectedNodeType.Brand, FakeBrand],
        [ExpectedNodeType.CarModel, FakeCarModel],
        [ExpectedNodeType.CarModelVariant, FakeCarModelVariant],
        [ExpectedNodeType.Price, FakePrice],
        [ExpectedNodeType.RaceTrack, FakeRaceTrack],
        [ExpectedNodeType.TrackLayout, FakeTrackLayout],
        [ExpectedNodeType.RacingSeries, FakeRacingSeries],
        [ExpectedNodeType.RacingEvent, FakeRacingEvent],
        [ExpectedNodeType.RacingSession, FakeRacingSession],
        [ExpectedNodeType.SessionResult, FakeSessionResult],
        [ExpectedNodeType.LapTime, FakeLapTime],
        [ExpectedNodeType.RacingGame, FakeRacingGame],
        [ExpectedNodeType.GamingPlatform, FakeGamingPlatform],
        [ExpectedNodeType.ModelCar, FakeModelCar],
        [ExpectedNodeType.ModelCarBrand, FakeModelCarBrand],
        [ExpectedNodeType.Magazine, FakeMagazine],
        [ExpectedNodeType.MagazineIssue, FakeMagazineIssue],
        [ExpectedNodeType.Rating, FakeRating],
        [ExpectedNodeType.Programme, FakeProgramme],
        [ExpectedNodeType.ProgrammeEpisode, FakeProgrammeEpisode],
        [ExpectedNodeType.MotorShow, FakeMotorShow],
        [ExpectedNodeType.Image, FakeImage],
    ])

    const fakeNode = mapping.get(nodeType)

    if (!fakeNode) {
        assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }

    return fakeNode
}
