import type {NodeType} from "../../NodeType"
import FakeBrand from "./FakeBrand"
import FakeCarModel from "./FakeCarModel"
import FakeImage from "./FakeImage"

export function FakeNode(nodeType: NodeType) {
    switch (nodeType) {
        case 'brand':
            return FakeBrand
        case 'car model':
            return FakeCarModel
        case 'image':
            return FakeImage
    }
}
