import type {NodeType} from "../NodeType"
import {seedBrand} from "./brands/nodes/seedBrand"
import {seedCarModel} from "./car-models/nodes/seedCarModel"
import {seedImage} from "./images/nodes/seedImage"

export async function seedNode(nodeType: NodeType) {
    switch (nodeType) {
        case "brand":
            return await seedBrand()
        case "car model":
            return await seedCarModel()
        case "image":
            return await seedImage()
    }
}
