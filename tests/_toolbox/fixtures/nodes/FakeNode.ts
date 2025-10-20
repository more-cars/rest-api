import type {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import FakeCompany from "./FakeCompany"
import FakeBrand from "./FakeBrand"
import FakeCarModel from "./FakeCarModel"
import FakeRaceTrack from "./FakeRaceTrack"
import FakeImage from "./FakeImage"

export function FakeNode(nodeType: NodeTypeEnum) {
    switch (nodeType) {
        case 'company':
            return FakeCompany
        case 'brand':
            return FakeBrand
        case 'car model':
            return FakeCarModel
        case 'race track':
            return FakeRaceTrack
        case 'image':
            return FakeImage
    }
}
