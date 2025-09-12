import type {NodeType} from "../NodeType"
import {seedBrand} from "./brands/nodes/seedBrand"
import {seedCarModel} from "./car-models/nodes/seedCarModel"
import {seedImage} from "./images/nodes/seedImage"
import {seedCompany} from "./companies/nodes/seedCompany"

export async function seedNode(nodeType: NodeType) {
    switch (nodeType) {
        case "brand":
            return await seedBrand()
        case "car model":
            return await seedCarModel()
        case "image":
            return await seedImage()
        case "company":
            return await seedCompany()
    }
}
