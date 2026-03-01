import assert from "assert"
import {NodeType} from "../../../../src/specification/NodeType"
import type {FakeNode} from "./types/FakeNode"
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
import {FakeMagazineIssue} from "./FakeMagazineIssue"
import {FakeImage} from "./FakeImage"

export function getFakeNode(nodeType: NodeType) {
    const mapping = new Map<NodeType, FakeNode>([
        [NodeType.Company, FakeCompany],
        [NodeType.Brand, FakeBrand],
        [NodeType.CarModel, FakeCarModel],
        [NodeType.CarModelVariant, FakeCarModelVariant],
        [NodeType.RaceTrack, FakeRaceTrack],
        [NodeType.TrackLayout, FakeTrackLayout],
        [NodeType.RacingSeries, FakeRacingSeries],
        [NodeType.RacingEvent, FakeRacingEvent],
        [NodeType.RacingSession, FakeRacingSession],
        [NodeType.SessionResult, FakeSessionResult],
        [NodeType.LapTime, FakeLapTime],
        [NodeType.RacingGame, FakeRacingGame],
        [NodeType.GamingPlatform, FakeGamingPlatform],
        [NodeType.Magazine, FakeMagazine],
        [NodeType.MagazineIssue, FakeMagazineIssue],
        [NodeType.Image, FakeImage],
        [NodeType.Node, FakeBrand],
    ])

    const fakeNode = mapping.get(nodeType)

    if (!fakeNode) {
        assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }

    return fakeNode
}
