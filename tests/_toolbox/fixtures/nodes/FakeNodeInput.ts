import assert from "assert"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import FakeCompany from "./FakeCompany"
import FakeBrand from "./FakeBrand"
import FakeCarModel from "./FakeCarModel"
import FakeRaceTrack from "./FakeRaceTrack"
import FakeTrackLayout from "./FakeTrackLayout"
import FakeImage from "./FakeImage"

export function FakeNodeInput(nodeType: NodeTypeEnum) {
    switch (nodeType) {
        case NodeTypeEnum.COMPANY:
            return FakeCompany
        case NodeTypeEnum.BRAND:
            return FakeBrand
        case NodeTypeEnum.CAR_MODEL:
            return FakeCarModel
        case NodeTypeEnum.RACE_TRACK:
            return FakeRaceTrack
        case NodeTypeEnum.TRACK_LAYOUT:
            return FakeTrackLayout
        case NodeTypeEnum.IMAGE:
            return FakeImage
        default:
            assert.fail(`Node type "${nodeType}" is invalid or unknown`)
    }
}
